import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Play, RotateCcw, RotateCw, Square, Volume2, VolumeX } from "lucide-react";
import YouTube from "react-youtube";
import { Button } from "./Button";
import { cn } from "./utils/utils";

// YouTube API型定義
declare global {
  namespace YT {
    interface Player {
      playVideo(): void;
      pauseVideo(): void;
      stopVideo(): void;
      seekTo(seconds: number): void;
      getCurrentTime(): number;
      getVolume(): number;
      setVolume(volume: number): void;
      unMute(): void;
    }
  }
}

const youtubeVariants = cva("flex flex-col items-center justify-center space-y-4", {
  variants: {
    size: {
      sm: "space-y-2",
      md: "space-y-4",
      lg: "space-y-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type YoutubeProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof youtubeVariants> & {
    /**
     * YouTube動画ID
     */
    id: string;
    /**
     * 再生終了時間（秒）
     */
    endSec?: number;
    /**
     * 音量スライダーの表示
     */
    showVolumeSlider?: boolean;
  };

export type YoutubeAnswerProps = Omit<YoutubeProps, "endSec" | "showVolumeSlider">;

/**
 * YouTube動画プレイヤーコンポーネント（shadcn/ui形式）
 */
const Youtube = React.forwardRef<HTMLDivElement, YoutubeProps>(
  ({ className, size, id, endSec = 15, showVolumeSlider = true, ...props }, ref) => {
    const [youtube, setYoutube] = React.useState<YT.Player | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [playing, setPlaying] = React.useState(false);
    const [volume, setVolume] = React.useState(0);

    const opts = {
      height: "1",
      width: "1",
      playerVars: {
        autoplay: 0,
        end: endSec,
      },
    };

    const onReady = (event: { target: YT.Player }) => {
      event.target.pauseVideo();
      event.target.unMute();
      setYoutube(event.target);
      setVolume(event.target.getVolume());
      setLoading(false);
    };

    const onError = (error: unknown) => {
      console.error("YouTube player error:", error);
      setLoading(false);
    };

    const onStateChange = (event: { data: number }) => {
      // YouTube Player State: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
      if (event.data === 0) {
        // ended
        setPlaying(false);
      } else if (event.data === 1) {
        // playing
        setPlaying(true);
      } else if (event.data === 2) {
        // paused
        setPlaying(false);
      }
    };

    const onStart = () => {
      youtube?.playVideo();
      setPlaying(true);
    };

    const onStop = () => {
      youtube?.stopVideo();
      setPlaying(false);
    };

    const onRewind = () => {
      const currentTime = youtube?.getCurrentTime();
      if (currentTime !== undefined) {
        youtube?.seekTo(currentTime - 10);
      }
    };

    const onForward = () => {
      const currentTime = youtube?.getCurrentTime();
      if (currentTime !== undefined) {
        youtube?.seekTo(currentTime + 10);
      }
    };

    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = Number(event.target.value);
      setVolume(newVolume);
      youtube?.setVolume(newVolume);
    };

    return (
      /* biome-ignore lint/a11y/useSemanticElements: Wrapper div for YouTube player, cannot use button */
      <div
        ref={ref}
        className={cn(youtubeVariants({ size, className }))}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.stopPropagation();
          }
        }}
        role="button"
        tabIndex={0}
        {...props}
      >
        <div>
          <YouTube
            videoId={id}
            opts={opts}
            onReady={onReady}
            onError={onError}
            onStateChange={onStateChange}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onRewind}
            disabled={loading}
            aria-label="10秒戻る"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>

          {!playing ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onStart}
              disabled={loading}
              aria-label="再生"
            >
              <Play className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onStop}
              disabled={loading}
              aria-label="停止"
            >
              <Square className="h-4 w-4" />
            </Button>
          )}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onForward}
            disabled={loading}
            aria-label="10秒進む"
          >
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>

        {showVolumeSlider && youtube && (
          <div className="flex items-center space-x-3 w-full max-w-xs">
            <VolumeX className="h-4 w-4 text-muted-foreground" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="flex-1 h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
              aria-label="音量調整"
            />
            <Volume2 className="h-4 w-4 text-muted-foreground" />
          </div>
        )}
      </div>
    );
  }
);
Youtube.displayName = "Youtube";

/**
 * 回答用YouTube動画プレイヤーコンポーネント（シンプル版）
 */
const YoutubeAnswer = React.forwardRef<HTMLDivElement, YoutubeAnswerProps>(
  ({ className, size, id, ...props }, ref) => {
    const [youtube, setYoutube] = React.useState<YT.Player | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [playing, setPlaying] = React.useState(false);

    const opts = {
      height: "1",
      width: "1",
      playerVars: {
        autoplay: 0,
      },
    };

    const onReady = (event: { target: YT.Player }) => {
      event.target.pauseVideo();
      event.target.unMute();
      setYoutube(event.target);
      setLoading(false);
    };

    const onError = (error: unknown) => {
      console.error("YouTube player error:", error);
      setLoading(false);
    };

    const onStateChange = (event: { data: number }) => {
      // YouTube Player State: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
      if (event.data === 0) {
        // ended
        setPlaying(false);
      } else if (event.data === 1) {
        // playing
        setPlaying(true);
      } else if (event.data === 2) {
        // paused
        setPlaying(false);
      }
    };

    const onStart = () => {
      youtube?.playVideo();
      setPlaying(true);
    };

    const onStop = () => {
      youtube?.stopVideo();
      setPlaying(false);
    };

    const adjustVolume = (delta: number) => {
      const currentVolume = youtube?.getVolume() || 0;
      youtube?.setVolume(Math.max(0, Math.min(100, currentVolume + delta)));
    };

    return (
      /* biome-ignore lint/a11y/useSemanticElements: Wrapper div for YouTube player, cannot use button */
      <div
        ref={ref}
        className={cn("relative flex items-center justify-center h-full min-h-12", className)}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.stopPropagation();
          }
        }}
        role="button"
        tabIndex={0}
        {...props}
      >
        <div className="absolute opacity-0 pointer-events-none -z-10">
          <YouTube
            videoId={id}
            opts={opts}
            onReady={onReady}
            onError={onError}
            onStateChange={onStateChange}
          />
        </div>

        <div className="flex items-center justify-center space-x-1 z-10">
          {!playing ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onStart}
              disabled={loading}
              aria-label="再生"
              className="h-8 w-8 p-0"
            >
              <Play className="h-3 w-3" />
            </Button>
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onStop}
              disabled={loading}
              aria-label="停止"
              className="h-8 w-8 p-0"
            >
              <Square className="h-3 w-3" />
            </Button>
          )}

          {youtube && (
            <>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => adjustVolume(-10)}
                disabled={loading}
                aria-label="音量を下げる"
                className="h-8 w-8 p-0"
              >
                <VolumeX className="h-3 w-3" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => adjustVolume(10)}
                disabled={loading}
                aria-label="音量を上げる"
                className="h-8 w-8 p-0"
              >
                <Volume2 className="h-3 w-3" />
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }
);
YoutubeAnswer.displayName = "YoutubeAnswer";

export { Youtube, YoutubeAnswer, youtubeVariants };
