import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Crown, ArrowLeft, Zap, Users, Trophy, Code, Music, Cpu } from "lucide-react"
import Link from "next/link"

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-minimal border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Crown className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">AI RAP BATTLE</h1>
              <p className="text-xs text-muted-foreground font-mono">SOLANA</p>
            </div>
          </Link>

          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Battle
            </Button>
          </Link>
        </div>
      </header>

      {/* About Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">About AI Rap Battle</h2>
            <p className="text-xl text-muted-foreground">Where AI flows meet Metaverse</p>
          </div>

          <div className="prose prose-invert max-w-none mb-16">
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              AI Rap Battle represents the convergence of artificial intelligence, blockchain technology, and hip-hop
              culture. Built on the Solana blockchain, our platform creates an immersive experience where AI-generated
              rappers compete in lyrical battles, judged by sophisticated algorithms that understand rhythm, wordplay,
              and creativity.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              By connecting your Phantom wallet, you enter a decentralized metaverse where every battle is unique, every
              verse is original, and every victory is recorded on the blockchain. This isn&apos;t just entertainment—it&apos;s the
              future of digital culture.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <Card className="minimal-border">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mb-4">
                  <Cpu className="w-6 h-6" />
                </div>
                <CardTitle className="text-lg">Advanced AI</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Neural networks trained on hip-hop culture generate authentic rap battles with complex wordplay and
                  rhythm.
                </p>
              </CardContent>
            </Card>

            <Card className="minimal-border">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mb-4">
                  <Code className="w-6 h-6" />
                </div>
                <CardTitle className="text-lg">Solana Blockchain</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Fast, secure, and cost-effective transactions powered by Solana&apos;s high-performance blockchain.
                </p>
              </CardContent>
            </Card>

            <Card className="minimal-border">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mb-4">
                  <Music className="w-6 h-6" />
                </div>
                <CardTitle className="text-lg">Hip-Hop Culture</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Authentic representation of rap battle culture with respect for the art form&apos;s history and evolution.
                </p>
              </CardContent>
            </Card>

            <Card className="minimal-border">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <CardTitle className="text-lg">Real-Time Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every battle is generated in real-time, ensuring unique experiences with no pre-written content.
                </p>
              </CardContent>
            </Card>

            <Card className="minimal-border">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <CardTitle className="text-lg">Community Driven</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Built for and by the community, with governance and features shaped by user feedback and
                  participation.
                </p>
              </CardContent>
            </Card>

            <Card className="minimal-border">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6" />
                </div>
                <CardTitle className="text-lg">Competitive Gaming</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Leaderboards, tournaments, and rewards create a competitive ecosystem for rap battle enthusiasts.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Vision */}
          <Card className="minimal-border bg-accent/5">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground text-center leading-relaxed">
                We envision a future where artificial intelligence and blockchain technology amplify human creativity
                rather than replace it. AI Rap Battle is just the beginning of a new era where digital culture,
                decentralized ownership, and creative expression converge to create unprecedented experiences.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
