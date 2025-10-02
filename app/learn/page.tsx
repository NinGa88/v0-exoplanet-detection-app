"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Telescope, TrendingDown, Lightbulb, Rocket, Star, Globe } from "lucide-react"

export default function LearnPage() {
  const [activeSection, setActiveSection] = useState<string>("basics")

  const glossaryTerms = [
    {
      term: "Exoplanet",
      definition: "A planet that orbits a star outside our solar system. Over 5,000 have been confirmed to date.",
    },
    {
      term: "Transit",
      definition:
        "When a planet passes directly between its host star and an observer, causing a temporary dimming of the star's light.",
    },
    {
      term: "Light Curve",
      definition:
        "A graph showing how the brightness of a celestial object changes over time. Used to detect planetary transits.",
    },
    {
      term: "Orbital Period",
      definition: "The time it takes for a planet to complete one full orbit around its host star, measured in days.",
    },
    {
      term: "Transit Depth",
      definition:
        "The amount of starlight blocked during a transit, expressed as a percentage. Larger planets block more light.",
    },
    {
      term: "Host Star",
      definition: "The star that an exoplanet orbits. Its properties help determine the planet's characteristics.",
    },
    {
      term: "Habitable Zone",
      definition:
        "The region around a star where conditions might be right for liquid water to exist on a planet's surface.",
    },
    {
      term: "Radial Velocity",
      definition:
        "A detection method that measures the wobble of a star caused by the gravitational pull of orbiting planets.",
    },
  ]

  const missions = [
    {
      name: "Kepler Space Telescope",
      years: "2009-2018",
      discoveries: "2,662 confirmed exoplanets",
      description:
        "NASA's Kepler mission revolutionized exoplanet science by continuously monitoring over 150,000 stars, discovering thousands of planets using the transit method.",
      icon: Telescope,
    },
    {
      name: "K2 Mission",
      years: "2014-2018",
      discoveries: "500+ confirmed exoplanets",
      description:
        "After Kepler's reaction wheels failed, the K2 mission continued the search by observing different fields along the ecliptic plane.",
      icon: Rocket,
    },
    {
      name: "TESS (Transiting Exoplanet Survey Satellite)",
      years: "2018-Present",
      discoveries: "400+ confirmed exoplanets",
      description:
        "TESS surveys the entire sky, focusing on nearby bright stars to find planets suitable for detailed follow-up observations.",
      icon: Star,
    },
  ]

  return (
    <div className="min-h-screen bg-background starfield">
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Learn About Exoplanets</h1>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Discover how astronomers detect distant worlds and understand the science behind exoplanet hunting.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="p-4 bg-card border-border sticky top-24">
              <h3 className="font-bold mb-4">Topics</h3>
              <div className="space-y-2">
                {[
                  { id: "basics", label: "The Basics", icon: Lightbulb },
                  { id: "transit", label: "Transit Method", icon: TrendingDown },
                  { id: "missions", label: "NASA Missions", icon: Rocket },
                  { id: "glossary", label: "Glossary", icon: BookOpen },
                ].map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setActiveSection(topic.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeSection === topic.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary text-muted-foreground"
                    }`}
                  >
                    <topic.icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{topic.label}</span>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* The Basics */}
            {activeSection === "basics" && (
              <div className="space-y-6">
                <Card className="p-6 bg-card border-border">
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold">What Are Exoplanets?</h2>
                  </div>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Exoplanets are planets that orbit stars outside our solar system. The first confirmed detection
                      was made in 1992, and since then, astronomers have discovered over 5,000 confirmed exoplanets with
                      thousands more candidates awaiting verification.
                    </p>
                    <p>
                      These distant worlds come in all sizes, from gas giants larger than Jupiter to rocky planets
                      smaller than Earth. Some orbit close to their stars with scorching temperatures, while others are
                      frozen worlds far from their suns.
                    </p>
                    <p>
                      The search for exoplanets is driven by one of humanity's most profound questions: Are we alone in
                      the universe? By finding and studying these planets, especially those in habitable zones,
                      scientists hope to discover worlds that might harbor life.
                    </p>
                  </div>
                </Card>

                <Card className="p-6 bg-card border-border">
                  <h3 className="text-xl font-bold mb-4">Why Study Exoplanets?</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex gap-3">
                      <Globe className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold mb-1">Search for Life</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Finding planets in habitable zones where liquid water could exist.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Telescope className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold mb-1">Understand Formation</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Learning how planetary systems form and evolve over time.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Star className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold mb-1">Characterize Atmospheres</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Analyzing atmospheric composition for signs of habitability.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Rocket className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold mb-1">Advance Technology</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Developing new detection methods and instruments.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Transit Method */}
            {activeSection === "transit" && (
              <div className="space-y-6">
                <Card className="p-6 bg-card border-border">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingDown className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold">The Transit Method</h2>
                  </div>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      The transit method is the most successful technique for discovering exoplanets. It works by
                      detecting the tiny dip in a star's brightness when a planet passes directly between the star and
                      our telescopes.
                    </p>
                    <p>
                      When a planet transits its star, it blocks a small fraction of the star's light. For an
                      Earth-sized planet crossing a Sun-like star, this dimming is only about 0.01% - incredibly subtle
                      but detectable with precise instruments.
                    </p>
                  </div>
                </Card>

                <Card className="p-6 bg-card border-border">
                  <h3 className="text-xl font-bold mb-4">How It Works</h3>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="step1">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <Badge>1</Badge>
                          <span>Continuous Monitoring</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground leading-relaxed">
                          Space telescopes like Kepler and TESS continuously monitor thousands of stars, measuring their
                          brightness with extreme precision over weeks, months, or years.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="step2">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <Badge>2</Badge>
                          <span>Detect the Dip</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground leading-relaxed">
                          When a planet passes in front of its star, the star's brightness decreases slightly. This
                          creates a characteristic dip in the light curve that can be detected and measured.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="step3">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <Badge>3</Badge>
                          <span>Look for Periodicity</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground leading-relaxed">
                          If the dips repeat at regular intervals, it indicates a planet orbiting the star. The time
                          between transits reveals the planet's orbital period.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="step4">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <Badge>4</Badge>
                          <span>Calculate Properties</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground leading-relaxed">
                          The depth of the transit tells us the planet's size relative to its star. The duration of the
                          transit helps determine the planet's orbital distance and the star's properties.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Card>

                <Card className="p-6 bg-primary/5 border-primary/20">
                  <h3 className="font-bold mb-2">Key Insight</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The transit method only works when a planet's orbit is aligned edge-on from our perspective. This
                    means we can only detect a small fraction of all exoplanets, but the ones we find provide rich data
                    for analysis.
                  </p>
                </Card>
              </div>
            )}

            {/* NASA Missions */}
            {activeSection === "missions" && (
              <div className="space-y-6">
                <Card className="p-6 bg-card border-border">
                  <div className="flex items-center gap-2 mb-4">
                    <Rocket className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold">NASA Exoplanet Missions</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    NASA has launched several groundbreaking missions dedicated to discovering and studying exoplanets.
                    These space telescopes have revolutionized our understanding of planetary systems.
                  </p>
                </Card>

                {missions.map((mission, index) => (
                  <Card key={index} className="p-6 bg-card border-border">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <mission.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">{mission.name}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">{mission.years}</Badge>
                          <Badge variant="outline">{mission.discoveries}</Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{mission.description}</p>
                  </Card>
                ))}
              </div>
            )}

            {/* Glossary */}
            {activeSection === "glossary" && (
              <div className="space-y-6">
                <Card className="p-6 bg-card border-border">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold">Astronomy Glossary</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Key terms and concepts used in exoplanet science and astronomy.
                  </p>
                </Card>

                <div className="grid gap-4">
                  {glossaryTerms.map((item, index) => (
                    <Card key={index} className="p-4 bg-card border-border">
                      <h3 className="font-bold mb-2">{item.term}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.definition}</p>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
