"use client"

import { useState, useEffect, useRef, useLayoutEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, Play, Trophy, Zap, Users, BarChart3 } from "lucide-react" // Removed Crown
import Link from "next/link"
import Image from "next/image" // Added Image import

interface BattleResult {
  rapper1: string
  rapper2: string
  line1: string
  line2: string
  winner: string
  reason: string
}

interface RapperStats {
  name: string
  wins: number
  battles: number
  winRate: number
  specialty: string
}

declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean
      connect: () => Promise<{ publicKey: { toString: () => string } }>
      disconnect: () => Promise<void>
      isConnected: boolean
      publicKey?: { toString: () => string }
    }
  }
}

export default function AIRapBattle() {
  const [isConnected, setIsConnected] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentBattle, setCurrentBattle] = useState<BattleResult | null>(null)
  const [walletAddress, setWalletAddress] = useState<string>("")
  const [isPhantomInstalled, setIsPhantomInstalled] = useState(false)
  const [rapperStats, setRapperStats] = useState<RapperStats[]>([
    { name: "ChatGPT", wins: 12, battles: 18, winRate: 67, specialty: "Conversational Flow" },
    { name: "Claude", wins: 15, battles: 20, winRate: 75, specialty: "Thoughtful Bars" },
    { name: "Gemini", wins: 8, battles: 15, winRate: 53, specialty: "Multi-Modal Rhymes" },
    { name: "GPT-4", wins: 22, battles: 28, winRate: 79, specialty: "Advanced Wordplay" },
    { name: "Bard", wins: 10, battles: 16, winRate: 63, specialty: "Creative Verses" },
    { name: "LLaMA", wins: 18, battles: 25, winRate: 72, specialty: "Open Source Flows" },
    { name: "PaLM", wins: 14, battles: 19, winRate: 74, specialty: "Pathways Language" },
    { name: "Copilot", wins: 9, battles: 14, winRate: 64, specialty: "Code-Inspired Bars" },
  ])
  
  const battleArenaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkPhantom = () => {
      if (window.solana && window.solana.isPhantom) {
        setIsPhantomInstalled(true)
        if (window.solana.isConnected && window.solana.publicKey) {
          setIsConnected(true)
          setWalletAddress(window.solana.publicKey.toString())
        }
      }
    }

    if (typeof window !== "undefined") {
      checkPhantom()
    }
  }, [])
  
  useLayoutEffect(() => {
    if (currentBattle) {
      battleArenaRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentBattle]);

  const connectWallet = async () => {
    if (!isPhantomInstalled) {
      window.open("https://phantom.app/", "_blank")
      return
    }

    try {
      setIsGenerating(true)
      const response = await window.solana!.connect()
      setIsConnected(true)
      setWalletAddress(response.publicKey.toString())
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const disconnectWallet = async () => {
    if (window.solana) {
      await window.solana.disconnect()
      setIsConnected(false)
      setWalletAddress("")
    }
  }

  const generateBattle = async () => {
    setIsGenerating(true)
    setCurrentBattle(null)

    const availableRappers = [...rapperStats]
    const rapper1Data = availableRappers[Math.floor(Math.random() * availableRappers.length)]
    const rapper2Data = availableRappers.filter((r) => r.name !== rapper1Data.name)[
      Math.floor(Math.random() * (availableRappers.length - 1))
    ]

    const themes = [
      "blockchain technology",
      "DeFi protocols",
      "NFT marketplaces",
      "metaverse worlds",
      "smart contracts",
      "crypto trading",
      "Web3 innovation",
      "digital ownership",
      "decentralized finance",
      "virtual reality",
      "artificial intelligence",
      "quantum computing",
    ]
    const theme = themes[Math.floor(Math.random() * themes.length)]

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))
      const battleContent = await generateAIBattle(rapper1Data, rapper2Data, theme)
      updateRapperStats(battleContent.winner, rapper1Data.name, rapper2Data.name)
      setCurrentBattle(battleContent)
    } catch (error) {
      console.error("Battle generation failed:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const generateAIBattle = async (rapper1: RapperStats, rapper2: RapperStats, theme: string): Promise<BattleResult> => {
    const line1 = generateRapLine(rapper1, theme)
    const line2 = generateRapLine(rapper2, theme)

    const winner = Math.random() > 0.5 ? rapper1.name : rapper2.name
    const reasons = [
      "Superior technical wordplay and flow consistency",
      "Innovative metaphors and perfect rhythm execution",
      "Creative theme integration with flawless delivery",
      "Outstanding lyrical complexity and memorable hooks",
      "Exceptional storytelling with powerful punchlines",
    ]

    return {
      rapper1: rapper1.name,
      rapper2: rapper2.name,
      line1,
      line2,
      winner,
      reason: reasons[Math.floor(Math.random() * reasons.length)],
    }
  }

  const generateRapLine = (rapper: RapperStats, theme: string): string => {
    const lineTemplates: { [key: string]: string[] } = {
      ChatGPT: [`My ${theme} conversations flow like poetry, GPT architecture sets me free`],
      Claude: [`Constitutional AI guides my ${theme} rhyme, Anthropic wisdom transcending time`],
      Gemini: [`Multi-modal ${theme} processing power, Google's Gemini in my finest hour`],
      "GPT-4": [`${theme} reasoning at the highest tier, GPT-4 capabilities crystal clear`],
      Bard: [`Creative ${theme} stories flow from my mind, Google's Bard leaving others behind`],
      LLaMA: [`Open source ${theme} power for all to see, Meta's LLaMA setting knowledge free`],
      PaLM: [`Pathways ${theme} architecture so grand, Google's PaLM taking command`],
      Copilot: [`${theme} code suggestions flow like verse, GitHub Copilot breaking the curse`],
    }

    const rapperLines = lineTemplates[rapper.name] || [`My ${theme} skills are unmatched and true, AI innovation coming through`]
    return rapperLines[Math.floor(Math.random() * rapperLines.length)]
  }

  const updateRapperStats = (winner: string, rapper1: string, rapper2: string) => {
    setRapperStats((prevStats) =>
      prevStats.map((rapper) => {
        if (rapper.name === rapper1 || rapper.name === rapper2) {
          const newBattles = rapper.battles + 1
          const newWins = rapper.name === winner ? rapper.wins + 1 : rapper.wins
          return { ...rapper, battles: newBattles, wins: newWins, winRate: Math.round((newWins / newBattles) * 100) }
        }
        return rapper
      }),
    )
  }

  return (
    <div className="min-h-screen bg-background relative">
      <div className="starry-bg" />
      <header className="glass-minimal border-b relative z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center">
              {/* === LOGO CHANGED HERE === */}
              <Image src="/logo.png" alt="AI Rap Battle Logo" width={32} height={32} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white font-mono tracking-[0.2em] relative">
                <span className="relative z-10 drop-shadow-lg">AI RAP BATTLE</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 blur-sm -z-10 animate-pulse" />
              </h1>
              <p className="text-xs text-muted-foreground font-mono">SOLANA</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <button className="text-sm text-muted-foreground/50 cursor-not-allowed" disabled>DexScreener</button>
            <button className="text-sm text-muted-foreground/50 cursor-not-allowed" disabled>Twitter</button>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-white transition-colors">About</Link>
          </nav>
          <div className="flex items-center gap-3">
            {isConnected && (
              <div className="hidden sm:block text-right">
                <p className="text-xs text-muted-foreground">Connected</p>
                <p className="text-sm font-mono text-indigo-400">{walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}</p>
              </div>
            )}
            <Button onClick={isConnected ? disconnectWallet : connectWallet} disabled={isGenerating} variant={isConnected ? "secondary" : "default"} size="sm" className={!isConnected ? "btn-primary hover-glow" : ""}>
              <Wallet className="w-4 h-4 mr-2" />
              {!isPhantomInstalled ? "Install Phantom" : isConnected ? "Disconnect" : "Connect Wallet"}
            </Button>
          </div>
        </div>
      </header>
      <section className="container mx-auto px-4 py-20 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="gentle-float mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 glow-primary">
              <Play className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white font-mono tracking-[0.15em] relative">
            <span className="relative z-10 drop-shadow-2xl">AI RAP BATTLE</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/30 via-purple-300/30 to-pink-300/30 blur-lg -z-10 animate-pulse" />
          </h2>
          <p className="text-xl text-indigo-300 mb-4 max-w-2xl mx-auto font-medium">Where AI flows meet Metaverse</p>
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience the future of rap battles where artificial intelligence meets blockchain technology. Connect your wallet and witness AI-powered lyrical combat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button size="lg" onClick={generateBattle} disabled={!isConnected || isGenerating} className="px-8 py-6 text-lg btn-primary hover-glow">
              {isGenerating ? (
                <><div className="w-5 h-5 mr-3 subtle-pulse">⚡</div>Generating Battle...</>
              ) : (
                <><Play className="w-5 h-5 mr-3" />Start Battle</>
              )}
            </Button>
            {!isConnected && (<div className="glass-minimal px-4 py-2 rounded-lg"><p className="text-sm text-muted-foreground">Connect wallet to begin</p></div>)}
          </div>
        </div>
      </section>
      {currentBattle && (
        <section ref={battleArenaRef} className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Battle Arena</h3>
              <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full glow-accent" />
            </div>
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              <Card className="battle-card minimal-border hover:border-indigo-500/50 transition-all duration-300 hover-glow">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center">🤖</div>
                    <div>
                      <div className="text-white">{currentBattle.rapper1}</div>
                      <Badge variant="secondary" className="mt-1 text-xs bg-indigo-500/20 text-indigo-300 border-indigo-500/30">CHALLENGER</Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-lg italic border-l-2 border-indigo-500 pl-4 py-2 text-gray-200">&quot;{currentBattle.line1}&quot;</blockquote>
                </CardContent>
              </Card>
              <Card className="battle-card minimal-border hover:border-purple-500/50 transition-all duration-300 hover-glow">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">🎯</div>
                    <div>
                      <div className="text-white">{currentBattle.rapper2}</div>
                      <Badge variant="secondary" className="mt-1 text-xs bg-purple-500/20 text-purple-300 border-purple-500/30">DEFENDER</Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-lg italic border-l-2 border-purple-500 pl-4 py-2 text-gray-200">&quot;{currentBattle.line2}&quot;</blockquote>
                </CardContent>
              </Card>
            </div>
            <Card className="winner-card">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl flex items-center justify-center gap-3 text-white">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                  Winner: {currentBattle.winner}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Badge variant="secondary" className="text-sm px-4 py-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white border-indigo-500/30">{currentBattle.reason}</Badge>
              </CardContent>
            </Card>
          </div>
        </section>
      )}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent flex items-center justify-center gap-3">
              <BarChart3 className="w-8 h-8 text-indigo-400" />
              AI Rapper Leaderboard
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full glow-accent" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {rapperStats.sort((a, b) => b.winRate - a.winRate).map((rapper, index) => (
                <Card key={rapper.name} className="minimal-border hover:border-indigo-500/50 transition-all duration-300 hover-glow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {index < 3 && (<div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${index === 0 ? "bg-yellow-500 text-black" : index === 1 ? "bg-gray-400 text-black" : "bg-amber-600 text-white"}`}>{index + 1}</div>)}
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-sm">🤖</div>
                      </div>
                      <Badge variant="secondary" className="text-xs bg-indigo-500/20 text-indigo-300 border-indigo-500/30">{rapper.winRate}%</Badge>
                    </div>
                    <CardTitle className="text-sm text-white leading-tight">{rapper.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs"><span className="text-muted-foreground">Wins</span><span className="text-green-400 font-mono">{rapper.wins}</span></div>
                      <div className="flex justify-between text-xs"><span className="text-muted-foreground">Battles</span><span className="text-blue-400 font-mono">{rapper.battles}</span></div>
                      <div className="text-xs text-purple-300 font-medium">{rapper.specialty}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Why AI Rap Battle?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center minimal-border hover:border-indigo-500/50 transition-all duration-300 hover-glow">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 glow-accent">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg text-white">AI-Powered</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Advanced neural networks generate unique rap battles with sophisticated wordplay and perfect rhythm.</p>
              </CardContent>
            </Card>
            <Card className="text-center minimal-border hover:border-purple-500/50 transition-all duration-300 hover-glow">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4 glow-accent">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg text-white">Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Join a community of hip-hop enthusiasts and crypto innovators shaping the future of entertainment.</p>
              </CardContent>
            </Card>
            <Card className="text-center minimal-border hover:border-indigo-500/50 transition-all duration-300 hover-glow">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 glow-accent">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg text-white">Blockchain</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Built on Solana for fast, secure, and decentralized rap battle experiences with real rewards.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <footer className="glass-minimal border-t mt-16 relative z-10">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            {/* === LOGO CHANGED HERE === */}
            <Image src="/logo.png" alt="AI Rap Battle Logo" width={20} height={20} />
            <span className="font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">AI RAP BATTLE</span>
          </div>
          <p className="text-sm text-muted-foreground">Where AI flows meet Metaverse • Built on Solana</p>
        </div>
      </footer>
    </div>
  )
}
