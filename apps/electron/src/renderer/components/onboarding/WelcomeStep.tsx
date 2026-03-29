import { StepFormLayout, ContinueButton } from "./primitives"

interface WelcomeStepProps {
  onContinue: () => void
  isExistingUser?: boolean
  isLoading?: boolean
}

/**
 * WelcomeStep - 浅绿色全屏背景欢迎页
 */
export function WelcomeStep({
  onContinue,
  isLoading = false
}: WelcomeStepProps) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center welcome-bg">
      {/* 全屏浅绿色网格 */}
      <div className="absolute inset-0 welcome-grid z-0" />

      {/* 绿色光线效果 */}
      <div className="absolute top-0 left-[20%] w-px h-full bg-gradient-to-b from-transparent via-[#19c265]/20 to-transparent welcome-streak" />
      <div className="absolute top-0 right-[25%] w-px h-full bg-gradient-to-b from-transparent via-[#19c265]/12 to-transparent welcome-streak" style={{ animationDelay: '3s' }} />
      <div className="absolute top-0 left-[60%] w-px h-full bg-gradient-to-b from-transparent via-[#19c265]/8 to-transparent welcome-streak" style={{ animationDelay: '5s' }} />

      {/* Floating Labels */}
      <div className="absolute z-40 top-[18%] left-[12%] welcome-float" style={{ animationDelay: '0s' }}>
        <div className="glass-card-green px-5 py-3 rounded-2xl flex items-center gap-2.5 shadow-sm border border-white/60 hover:shadow-lg transition-all duration-300 cursor-default">
          <span className="material-symbols-outlined text-[#19c265] text-xl">psychology</span>
          <span className="text-sm font-medium text-slate-600">上下文感知</span>
        </div>
      </div>

      <div className="absolute z-40 bottom-[25%] right-[12%] welcome-float" style={{ animationDelay: '1.2s' }}>
        <div className="glass-card-green px-5 py-3 rounded-2xl flex items-center gap-2.5 shadow-sm border border-white/60 hover:shadow-lg transition-all duration-300 cursor-default">
          <span className="material-symbols-outlined text-[#19c265] text-xl">bolt</span>
          <span className="text-sm font-medium text-slate-600">系统级响应</span>
        </div>
      </div>

      <div className="absolute z-40 top-[32%] right-[20%] welcome-float" style={{ animationDelay: '2.4s' }}>
        <div className="glass-card-green px-5 py-3 rounded-2xl flex items-center gap-2.5 shadow-sm border border-white/60 hover:shadow-lg transition-all duration-300 cursor-default">
          <span className="material-symbols-outlined text-[#19c265] text-xl">shield_lock</span>
          <span className="text-sm font-medium text-slate-600">私有化部署</span>
        </div>
      </div>

      {/* Center Content */}
      <div className="relative z-30 flex flex-col items-center justify-center max-w-4xl px-6 text-center">

        {/* Icon */}
        <div className="relative mb-16 group">
          <div className="absolute inset-0 rounded-[3.5rem] bg-[#19c265]/15 blur-[80px] welcome-pulse" />

          <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-[3rem] bg-white/80 flex items-center justify-center glass-card-main shadow-2xl rotate-6 group-hover:rotate-0 transition-transform duration-700 border border-white">
            <div className="absolute inset-3 rounded-[2.5rem] border border-green-100/50 bg-gradient-to-tr from-green-50/30 to-transparent" />

            <div className="relative w-24 h-24 bg-gradient-to-br from-[#19c265] to-[#15a356] rounded-full flex items-center justify-center shadow-[0_8px_40px_rgba(25,192,100,0.4)] -rotate-6 group-hover:rotate-0 transition-transform duration-700">
              <span className="material-symbols-outlined text-white text-5xl font-light">auto_awesome</span>
            </div>

            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-green-200/70 backdrop-blur-md flex items-center justify-center border border-white shadow-md">
              <div className="w-2 h-2 rounded-full bg-[#19c265] animate-pulse" />
            </div>
          </div>
        </div>

        {/* Typography */}
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight tracking-tight mb-6">
          iROOTClaw <span className="text-[#19c265]">预见未来</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-500 font-normal mb-14 max-w-xl">
          全能 AI 桌面助手，现已就绪。
        </p>

        {/* START Button */}
        <button
          onClick={onContinue}
          disabled={isLoading}
          className="group relative inline-flex items-center justify-center gap-3 px-12 py-5.5 rounded-2xl bg-slate-900 text-white font-bold text-lg overflow-hidden transition-all duration-300 hover:bg-[#19c265] hover:shadow-[0_20px_50px_rgba(25,192,100,0.4)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="relative z-10">{isLoading ? 'Loading...' : 'START'}</span>
          <span className="material-symbols-outlined relative z-10 text-xl group-hover:translate-x-1 transition-transform duration-300">arrow_forward</span>
        </button>

        {/* <div className="mt-10">
          <p className="text-xs text-slate-400 tracking-[0.25em] uppercase font-semibold">
            Native Desktop Edition v2.4.0
          </p>
        </div> */}
      </div>

      {/* Status Bar */}
      {/* <footer className="absolute bottom-8 left-0 w-full flex items-center justify-between px-12 text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#19c265]"></span>
            <span>System Ready</span>
          </div>
          <span className="h-3 w-px bg-slate-200"></span>
          <span>Latency: 12ms</span>
        </div>
        <div className="flex items-center gap-6">
          <span>Encrypted Connection</span>
          <span className="text-slate-200">|</span>
          <span>© 2024 IROOTCLAW</span>
        </div>
      </footer> */}

      {/* Styles - 纯浅绿背景，无中间光晕 */}
      <style>{`
        .bg-foreground-2 {
          background: #eff5f1;
        }
        .welcome-grid {
          background-image: radial-gradient(circle, #86efac 0.5px, transparent 0.5px);
          background-size: 28px 28px;
          opacity: 0.4;
        }
        .welcome-streak {
          animation: streak 12s linear infinite;
        }
        .welcome-float {
          animation: float 7s ease-in-out infinite;
        }
        .welcome-pulse {
          animation: pulse 5s ease-in-out infinite;
        }
        .glass-card-green {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .glass-card-main {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.02); }
        }
        @keyframes streak {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); opacity: 0; }
          10% { opacity: 0.15; }
          50% { opacity: 0.2; }
          90% { opacity: 0.15; }
          100% { transform: translateX(200%) translateY(200%) rotate(45deg); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
