import React, { useState } from 'react';
import { 
  Download, Smartphone, CheckCircle2, QrCode, Copy, Check, 
  ExternalLink, Sparkles, ShieldCheck, X, ArrowRight, Info,
  Flame, Laptop, RefreshCw, GitBranch, Github, Terminal
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface ApkInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApkInstallModal: React.FC<ApkInstallModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { isInstallable, isInstalled, isIOS, isAndroid, install } = usePWAInstall();
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedGitCmd, setCopiedGitCmd] = useState(false);
  const [activeTab, setActiveTab] = useState<'github' | 'direct' | 'builder' | 'qr'>('github');
  const [repoUser, setRepoUser] = useState('alam-rashid039');
  const [repoName, setRepoName] = useState('gymforge');

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ais-pre-ftfoz43otldojpi5w6dhw6-629566667760.asia-southeast1.run.app';
  const cleanAppUrl = currentUrl.split('?')[0].split('#')[0];
  const pwaBuilderUrl = `https://www.pwabuilder.com/reportcard?site=${encodeURIComponent(cleanAppUrl)}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(cleanAppUrl)}&color=ea580c&bgcolor=ffffff`;

  const githubRepoUrl = `https://github.com/${repoUser}/${repoName}`;
  const githubReleasesUrl = `${githubRepoUrl}/releases`;
  const githubActionsUrl = `${githubRepoUrl}/actions/workflows/build-apk.yml`;

  const gitPushCommand = `git remote add origin ${githubRepoUrl}.git\ngit branch -M main\ngit push -u origin main`;

  const copyUrl = () => {
    navigator.clipboard.writeText(cleanAppUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const copyGitCommand = () => {
    navigator.clipboard.writeText(gitPushCommand);
    setCopiedGitCmd(true);
    setTimeout(() => setCopiedGitCmd(false), 2000);
  };

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    } else {
      setActiveTab('direct');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border-2 border-orange-300 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 text-zinc-900 flex flex-col">
        {/* Modal Header */}
        <div className="p-6 border-b border-orange-200 bg-orange-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-500/30 flex-shrink-0">
              <Smartphone className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-zinc-900 text-xl tracking-tight">
                  GymForge APK on GitHub & Mobile
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold uppercase font-mono">
                  GitHub CI/CD Ready
                </span>
              </div>
              <p className="text-xs text-zinc-600 mt-0.5">
                Download compiled APK from GitHub Releases, build automatically via GitHub Actions, or install directly on Android.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-800 p-1.5 rounded-xl hover:bg-orange-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-orange-200 bg-orange-50/50 px-6 pt-3 gap-2 overflow-x-auto scrollbar-none">
          {[
            { id: 'github', label: '1. GitHub Releases APK', icon: Github },
            { id: 'direct', label: '2. 1-Click Mobile (WebAPK)', icon: Smartphone },
            { id: 'builder', label: '3. Cloud .APK Packager', icon: Download },
            { id: 'qr', label: '4. Scan QR Code', icon: QrCode },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'border-emerald-600 text-emerald-800 font-black'
                    : 'border-transparent text-zinc-500 hover:text-zinc-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 flex-1">
          {/* TAB 1: GITHUB RELEASES & ACTIONS PIPELINE */}
          {activeTab === 'github' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* GitHub Releases Hero Card */}
              <div className="p-5 rounded-2xl bg-orange-50 border-2 border-orange-300 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                      <Github className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-zinc-900 text-base">
                          GitHub Releases APK Binary
                        </h4>
                        <span className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-mono font-bold">
                          v1.0.0
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600 mt-0.5">
                        Download the standalone <strong className="text-orange-800 font-mono">GymForge-v1.0.0.apk</strong> file published directly on GitHub.
                      </p>
                    </div>
                  </div>

                  <a
                    href={githubReleasesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all cursor-pointer whitespace-nowrap"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download on GitHub</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Repository Configuration */}
                <div className="p-3 bg-white rounded-xl border border-orange-200 space-y-2">
                  <div className="flex items-center justify-between text-xs text-zinc-700">
                    <span className="font-semibold flex items-center gap-1.5 text-zinc-800">
                      <GitBranch className="w-3.5 h-3.5 text-orange-600" />
                      Target GitHub Repository:
                    </span>
                    <a
                      href={githubRepoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-700 hover:underline font-mono font-bold text-[11px] flex items-center gap-1"
                    >
                      <span>github.com/{repoUser}/{repoName}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Automated GitHub Actions Pipeline Details */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-orange-950 font-mono flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Automated GitHub Actions Build Workflow</span>
                  </h5>
                  <span className="text-[10px] font-mono text-zinc-500">.github/workflows/build-apk.yml</span>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900 text-zinc-100 font-mono text-xs space-y-2 border border-zinc-800 shadow-inner">
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-zinc-400 text-[11px]">
                    <span>Trigger APK Build by pushing to GitHub:</span>
                    <button
                      onClick={copyGitCommand}
                      className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-sans font-bold cursor-pointer"
                    >
                      {copiedGitCmd ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedGitCmd ? 'Copied' : 'Copy Git Commands'}</span>
                    </button>
                  </div>
                  <pre className="text-orange-300 text-[11px] overflow-x-auto py-1 leading-relaxed">
{gitPushCommand}
                  </pre>
                </div>
              </div>

              {/* 3 Step Android Sideload Guide */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-orange-950 font-mono">
                  How to Install the APK on Android Phone:
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-white border-2 border-orange-200 flex flex-col justify-between space-y-2 shadow-2xs">
                    <div className="w-7 h-7 rounded-lg bg-orange-100 text-orange-800 font-bold text-xs flex items-center justify-center border border-orange-300">
                      1
                    </div>
                    <div>
                      <h6 className="font-bold text-zinc-900 text-xs">Download APK</h6>
                      <p className="text-[11px] text-zinc-600 mt-0.5 leading-relaxed">
                        Tap <strong>GymForge-v1.0.0.apk</strong> on the GitHub Releases page to download.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border-2 border-orange-200 flex flex-col justify-between space-y-2 shadow-2xs">
                    <div className="w-7 h-7 rounded-lg bg-orange-100 text-orange-800 font-bold text-xs flex items-center justify-center border border-orange-300">
                      2
                    </div>
                    <div>
                      <h6 className="font-bold text-zinc-900 text-xs">Allow Unknown Apps</h6>
                      <p className="text-[11px] text-zinc-600 mt-0.5 leading-relaxed">
                        Android prompts: "Install unknown apps" &rarr; toggle <strong>Allow from this source</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border-2 border-orange-200 flex flex-col justify-between space-y-2 shadow-2xs">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center border border-emerald-300">
                      3
                    </div>
                    <div>
                      <h6 className="font-bold text-zinc-900 text-xs">Install & Launch</h6>
                      <p className="text-[11px] text-zinc-600 mt-0.5 leading-relaxed">
                        Tap <strong>Install</strong>. GymForge launches with full offline workout tracking!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DIRECT ANDROID WEBAPK INSTALL */}
          {activeTab === 'direct' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-5 rounded-2xl bg-orange-50 border-2 border-orange-300 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-emerald-600/20">
                    <Download className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 text-base">
                      {isInstalled ? 'App is Already Installed!' : 'One-Click Android Installation'}
                    </h4>
                    <p className="text-xs text-zinc-600">
                      {isInstalled
                        ? 'GymForge is currently running as an installed standalone Android app.'
                        : 'Google Play Services generates and installs the official WebAPK directly on your phone.'}
                    </p>
                  </div>
                </div>

                {!isInstalled && (
                  <button
                    onClick={handleInstallClick}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-emerald-600/25 transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>{isInstallable ? 'Install APK Now' : 'Add to Android'}</span>
                  </button>
                )}
              </div>

              {/* Steps */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-orange-950 font-mono">
                  Direct Android Chrome / Browser Steps:
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-white border-2 border-orange-200">
                    <span className="w-7 h-7 rounded-lg bg-orange-100 text-orange-800 font-bold text-xs flex items-center justify-center border border-orange-300 mb-2">1</span>
                    <h6 className="font-bold text-zinc-900 text-xs">Open in Chrome</h6>
                    <p className="text-[11px] text-zinc-600 mt-0.5">Open the link in Android Chrome.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border-2 border-orange-200">
                    <span className="w-7 h-7 rounded-lg bg-orange-100 text-orange-800 font-bold text-xs flex items-center justify-center border border-orange-300 mb-2">2</span>
                    <h6 className="font-bold text-zinc-900 text-xs">Tap Browser Menu</h6>
                    <p className="text-[11px] text-zinc-600 mt-0.5">Tap the three dots (⋮) in Chrome.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border-2 border-orange-200">
                    <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center border border-emerald-300 mb-2">3</span>
                    <h6 className="font-bold text-zinc-900 text-xs">Tap "Install App"</h6>
                    <p className="text-[11px] text-zinc-600 mt-0.5">Installs the native WebAPK package.</p>
                  </div>
                </div>
              </div>

              {isIOS && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900 space-y-1">
                  <span className="font-bold flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-amber-700" />
                    <span>For iPhone / iPad Users:</span>
                  </span>
                  <p className="leading-relaxed text-amber-800">
                    Tap the <strong>Share button</strong> in Safari toolbar, scroll down and select <strong>"Add to Home Screen"</strong>.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: DOWNLOAD VIA PWABUILDER */}
          {activeTab === 'builder' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-5 rounded-2xl bg-orange-50 border-2 border-orange-300 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-emerald-600 text-white shadow-xs">
                    <Download className="w-5 h-5" />
                  </span>
                  <div>
                    <h4 className="font-bold text-zinc-900 text-base">
                      Generate Signed Android .APK File via Cloud
                    </h4>
                    <p className="text-xs text-zinc-600">
                      Convert this PWA to a standalone `.apk` or `.aab` package using the official PWABuilder engine.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-orange-200 flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-zinc-700 truncate">
                    {cleanAppUrl}
                  </span>
                  <button
                    onClick={copyUrl}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-orange-100 hover:bg-orange-200 text-orange-900 text-xs font-bold transition-colors cursor-pointer flex-shrink-0"
                  >
                    {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedUrl ? 'Copied' : 'Copy URL'}</span>
                  </button>
                </div>

                <div className="pt-2">
                  <a
                    href={pwaBuilderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                  >
                    <span>Open PWABuilder & Download APK</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SCAN QR CODE ON PHONE */}
          {activeTab === 'qr' && (
            <div className="space-y-4 animate-in fade-in duration-150 text-center">
              <div className="max-w-xs mx-auto p-6 rounded-2xl bg-orange-50 border-2 border-orange-300 shadow-sm flex flex-col items-center">
                <div className="p-3 bg-white rounded-2xl border-2 border-orange-200 shadow-md">
                  <img
                    src={qrCodeUrl}
                    alt="Scan GymForge APK QR Code"
                    className="w-48 h-48 object-contain"
                  />
                </div>
                <p className="text-xs font-bold text-zinc-900 mt-3">
                  Scan with your Android camera
                </p>
                <p className="text-[11px] text-zinc-500 mt-0.5">
                  Directly opens GymForge for instant WebAPK installation.
                </p>
              </div>
            </div>
          )}

          {/* Android APK Compliance Checklist */}
          <div className="pt-2 border-t border-orange-200">
            <h5 className="text-[11px] font-bold uppercase tracking-wider text-orange-950 font-mono mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Android APK & GitHub CI/CD Specifications</span>
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono">
              <div className="p-2 rounded-lg bg-orange-50/70 border border-orange-200 flex items-center gap-1.5 text-emerald-800 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>GitHub Actions CI</span>
              </div>
              <div className="p-2 rounded-lg bg-orange-50/70 border border-orange-200 flex items-center gap-1.5 text-emerald-800 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Gradle Android App</span>
              </div>
              <div className="p-2 rounded-lg bg-orange-50/70 border border-orange-200 flex items-center gap-1.5 text-emerald-800 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>512px Maskable Icon</span>
              </div>
              <div className="p-2 rounded-lg bg-orange-50/70 border border-orange-200 flex items-center gap-1.5 text-emerald-800 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Offline Assets</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-orange-200 bg-orange-50 flex items-center justify-between">
          <span className="text-[11px] text-zinc-500 font-mono">
            GymForge v1.0.0 • GitHub Actions Release
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white hover:bg-orange-100 text-zinc-700 font-bold text-xs border border-orange-300 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
