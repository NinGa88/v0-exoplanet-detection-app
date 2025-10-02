import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Telescope, Database, Brain, LineChart, BookOpen, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background starfield">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 mb-6 bg-[rgba(255,162,0,0.1)]">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">NASA Space Apps Challenge 2025</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-balance">
            Discover <span className="text-primary">Exoplanets</span> with AI
          </h1>

          <p className="text-xl text-muted-foreground mb-8 text-pretty leading-relaxed max-w-2xl mx-auto">
            Hunt for distant worlds using machine learning and real NASA data. Analyze light curves from Kepler, K2, and
            TESS missions to detect planetary transits across the galaxy.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link href="/detector">
              <Button size="lg" className="glow-blue">
                Start Detecting
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/learn">
              <Button size="lg" variant="outline">
                Learn How It Works
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
            <Database className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Real NASA Data</h3>
            <p className="text-muted-foreground leading-relaxed">
              Access confirmed exoplanets and candidates from Kepler, K2, and TESS missions through NASA's Exoplanet
              Archive.
            </p>
          </Card>

          <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
            <Brain className="h-10 w-10 mb-4 text-accent" />
            <h3 className="text-xl font-bold mb-2">AI Detection</h3>
            <p className="text-muted-foreground leading-relaxed">
              Upload light curve data and let our machine learning model identify potential planetary transits with
              confidence scores.
            </p>
          </Card>

          <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
            <LineChart className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Interactive Visualization</h3>
            <p className="text-muted-foreground leading-relaxed">
              Explore exoplanet characteristics through dynamic charts showing orbital periods, sizes, and host star
              properties.
            </p>
          </Card>

          <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
            <Telescope className="h-10 w-10 mb-4 text-accent" />
            <h3 className="text-xl font-bold mb-2">Transit Photometry</h3>
            <p className="text-muted-foreground leading-relaxed">
              Understand how astronomers detect exoplanets by measuring the dimming of starlight as planets pass in
              front of their host stars.
            </p>
          </Card>

          <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
            <BookOpen className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Educational Resources</h3>
            <p className="text-muted-foreground leading-relaxed">
              Learn about exoplanet science with clear explanations, real mission examples, and an astronomy glossary.
            </p>
          </Card>

          <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
            <Sparkles className="h-10 w-10 mb-4 text-accent" />
            <h3 className="text-xl font-bold mb-2">Citizen Science</h3>
            <p className="text-muted-foreground leading-relaxed">
              Join the search for new worlds. Contribute to exoplanet research and help expand our understanding of the
              universe.
            </p>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <Card className="p-12 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">5,000+</div>
                <div className="text-muted-foreground">Confirmed Exoplanets</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2 text-foreground">3</div>
                <div className="text-muted-foreground">NASA Missions</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
                <div className="text-muted-foreground">Candidates Detected</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Hunt for Exoplanets?</h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Start exploring real NASA data and detecting distant worlds with AI-powered analysis.
          </p>
          <Link href="/explorer">
            <Button size="lg" className="glow-blue">
              Explore NASA Data
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
