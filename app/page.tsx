import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  ChevronDown,
  Microscope,
  FlaskRoundIcon as Flask,
  Atom,
  Beaker,
  Dna,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/common/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-black/30 z-10"></div>
          <div className="relative h-[500px] overflow-hidden">
            <Image
              src="https://images.pexels.com/photos/9574327/pexels-photo-9574327.jpeg"
              alt="Laboratory interior"
              width={1200}
              height={500}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-4 md:px-16">
              <div className="text-white max-w-3xl">
                <p className="text-sm mb-2">Welcome To LosAlamos</p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                  Serving Science <br />& Technology
                </h1>
                <Button className="bg-emerald-700 hover:bg-emerald-800 mt-4">
                  Our Service
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Award Section */}
        <section className="bg-emerald-700 text-white py-6 px-4">
          <div className="container mx-auto">
            <h2 className="text-xl md:text-2xl font-bold mb-2">
              Best Laboratory Award Winner Year 2021-2024
            </h2>
            <p className="text-sm opacity-80">
              The standard chunk of Lorem Ipsum used since the 1500s is
              reproduced.
            </p>
          </div>
        </section>

        {/* About Us Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Image
                  src="https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg"
                  alt="Laboratory researchers"
                  width={600}
                  height={400}
                  className="rounded-lg"
                />
              </div>
              <div>
                <p className="text-sm text-emerald-700 mb-2">About Us</p>
                <h2 className="text-2xl md:text-3xl font-bold text-emerald-800 mb-6">
                  We Employ The Latest Research Technology & Company
                </h2>
                <p className="text-gray-600 mb-6">
                  Our scientists and engineers focus their extreme curiosity on
                  national and global security & health related challenges.
                  Learn more about the Laboratory&apos;s R&D and science
                  segment.
                </p>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="bg-gray-100 rounded-full h-8 w-8 flex items-center justify-center text-emerald-700 shrink-0">
                      01
                    </div>
                    <div>
                      <h3 className="font-bold text-emerald-800 mb-1">
                        Central Forensic Science
                      </h3>
                      <p className="text-sm text-gray-600">
                        Forensic science is a discipline that applies scientific
                        analysis to the justice system, help prove the events of
                        crime.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="bg-gray-100 rounded-full h-8 w-8 flex items-center justify-center text-emerald-700 shrink-0">
                      02
                    </div>
                    <div>
                      <h3 className="font-bold text-emerald-800 mb-1">
                        Clinical & Medical Laboratory
                      </h3>
                      <p className="text-sm text-gray-600">
                        Conducts lab tests ordered by doctors. Working with
                        laboratory machines as we examine human tissue samples &
                        diagnose.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="bg-gray-100 rounded-full h-8 w-8 flex items-center justify-center text-emerald-700 shrink-0">
                      03
                    </div>
                    <div>
                      <h3 className="font-bold text-emerald-800 mb-1">
                        Analytical & Quality Laboratory
                      </h3>
                      <p className="text-sm text-gray-600">
                        The various techniques that we are used to identifying
                        the chemical makeup and characteristics of a particular
                        samples.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <p className="text-emerald-700 mb-2">Priority Delivered</p>
              <h2 className="text-2xl md:text-3xl font-bold text-emerald-800 mb-4">
                We Have Great Facts
              </h2>
              <Separator className="max-w-xs mx-auto" />
              <p className="text-gray-600 mt-4 max-w-3xl mx-auto text-sm">
                On the other hand we denounce with righteous indignation and
                dislike men who are so beguiled and demoralized by the pleasure
                of the desire that they cannot foresee.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                  1000
                </h3>
                <p className="text-gray-600 text-sm">Happy Clients</p>
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                  302
                </h3>
                <p className="text-gray-600 text-sm">Total Members</p>
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                  50+
                </h3>
                <p className="text-gray-600 text-sm">Years of Experience</p>
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                  640
                </h3>
                <p className="text-gray-600 text-sm">Work Suppliers</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 px-4 bg-blue-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <p className="text-gray-600 mb-2">What We Do Now</p>
              <h2 className="text-2xl md:text-3xl font-bold text-emerald-800 mb-4">
                Explore Our Main Services
              </h2>
              <Separator className="max-w-xs mx-auto" />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="h-48 overflow-hidden">
                  <Image
                    src="https://images.pexels.com/photos/9628833/pexels-photo-9628833.jpeg"
                    alt="Pathology Testing"
                    width={400}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-emerald-800 mb-4 text-center">
                    Pathology Testing
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 text-center">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit sed
                    do eiusmod tempor incididunt.
                  </p>
                  <div className="text-center">
                    <Button
                      variant="ghost"
                      className="text-emerald-700 hover:text-emerald-800"
                    >
                      READ MORE <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="h-48 overflow-hidden">
                  <Image
                    src="https://images.pexels.com/photos/4031416/pexels-photo-4031416.jpeg"
                    alt="Chemical Research"
                    width={400}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-emerald-800 mb-4 text-center">
                    Chemical Research
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 text-center">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit sed
                    do eiusmod tempor incididunt.
                  </p>
                  <div className="text-center">
                    <Button
                      variant="ghost"
                      className="text-emerald-700 hover:text-emerald-800"
                    >
                      READ MORE <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="h-48 overflow-hidden">
                  <Image
                    src="https://images.pexels.com/photos/8539453/pexels-photo-8539453.jpeg"
                    alt="Advanced Microscopy"
                    width={400}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-emerald-800 mb-4 text-center">
                    Advanced Microscopy
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 text-center">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit sed
                    do eiusmod tempor incididunt.
                  </p>
                  <div className="text-center">
                    <Button
                      variant="ghost"
                      className="text-emerald-700 hover:text-emerald-800"
                    >
                      READ MORE <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <Image
                  src="https://images.pexels.com/photos/3908182/pexels-photo-3908182.jpeg"
                  alt="Microscope"
                  width={600}
                  height={400}
                  className="rounded-lg"
                  style={{
                    maxWidth: "100%",
                    height: "500px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">A GREAT TECHNOLOGY</p>
                <h2 className="text-2xl md:text-3xl font-bold text-emerald-800 mb-6">
                  We Are The Trusted Experts
                  <br />
                  Latest Laboratory Technology
                </h2>
                <p className="text-gray-600 mb-6">
                  Pharmaceutical healthcare field attracts to save lives &
                  helping people, being a doctor is not your only choice. We
                  help also you can help patients without being a doctor, here
                  we serving awesome opportunity.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="text-emerald-700">
                      <Microscope className="h-5 w-5" />
                    </div>
                    <span className="text-gray-700 font-medium">
                      Cardioscience EIA
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-emerald-700">
                      <Flask className="h-5 w-5" />
                    </div>
                    <span className="text-gray-700 font-medium">
                      Sample Preparation
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-emerald-700">
                      <Beaker className="h-5 w-5" />
                    </div>
                    <span className="text-gray-700 font-medium">
                      Environmental Testing
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-emerald-700">
                      <Dna className="h-5 w-5" />
                    </div>
                    <span className="text-gray-700 font-medium">
                      Anatomical Pathology
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-emerald-700">
                      <Microscope className="h-5 w-5" />
                    </div>
                    <span className="text-gray-700 font-medium">
                      Advanced Microscopy
                    </span>
                  </div>
                </div>

                <p className="text-emerald-700 text-sm mb-4">
                  Don&apos;t hesitate, contact us for better help and services.
                </p>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  Explore all Technology
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="py-16 px-4 bg-emerald-800 text-white">
          <div className="container mx-auto">
            <div className="mb-8">
              <p className="text-emerald-200 mb-2">Experience</p>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Lab Trusted Experts
              </h2>
              <Separator className="bg-emerald-600 max-w-xs" />
              <p className="mt-4 text-emerald-100 max-w-2xl">
                We know how to bring the security you need. With an experience
                in a wide range of fields and devices.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Sample Preparation</span>
                  <span>68%</span>
                </div>
                <Progress value={68} className="h-2 bg-emerald-900" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Environmental Testing</span>
                  <span>80%</span>
                </div>
                <Progress value={80} className="h-2 bg-emerald-900" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Advanced Microscopy</span>
                  <span>61%</span>
                </div>
                <Progress value={61} className="h-2 bg-emerald-900" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Medical Research</span>
                  <span>70%</span>
                </div>
                <Progress value={70} className="h-2 bg-emerald-900" />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <p className="text-gray-600 mb-2">Testimonial</p>
              <h2 className="text-2xl md:text-3xl font-bold text-emerald-800 mb-4">
                What Our Patient Say
              </h2>
              <Separator className="max-w-xs mx-auto" />
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex flex-col items-center text-center">
                  <Image
                    src="https://captiontools.com/wp-content/uploads/2017/03/testy3-1.png"
                    alt="Testimonial"
                    width={80}
                    height={80}
                    className="rounded-full mb-4"
                  />
                  <p className="text-gray-600 mb-4 text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut
                  </p>
                  <div className="text-2xl font-serif mb-2">&apos;</div>
                  <h3 className="text-emerald-700 font-bold">JOSAN DEO</h3>
                  <p className="text-gray-600 text-sm">Plastic Touch</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex flex-col items-center text-center">
                  <Image
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Tp9QV0YOLXrb3m0G6FyUlGcx5sBr8UNN7Ez6nj6u7qOi-LXNL2P0Gx9ynX80l-gXYFc&usqp=CAU"
                    alt="Testimonial"
                    width={80}
                    height={80}
                    className="rounded-full mb-4"
                  />
                  <p className="text-gray-600 mb-4 text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut
                  </p>
                  <div className="text-2xl font-serif mb-2">&apos;</div>
                  <h3 className="text-emerald-700 font-bold">JOSAN MEILA</h3>
                  <p className="text-gray-600 text-sm">Media Touch</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="py-16 px-4 bg-blue-50">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              <div className="text-gray-400">
                <Flask className="h-12 w-12 mx-auto mb-2" />
                <p className="text-xs text-center">COMPANY LAB</p>
              </div>
              <div className="text-gray-400">
                <Atom className="h-12 w-12 mx-auto mb-2" />
                <p className="text-xs text-center">PHARMACY</p>
              </div>
              <div className="text-gray-400">
                <Beaker className="h-12 w-12 mx-auto mb-2" />
                <p className="text-xs text-center">BINARY LAB</p>
              </div>
              <div className="text-gray-400">
                <Flask className="h-12 w-12 mx-auto mb-2" />
                <p className="text-xs text-center">SCIENCELAB</p>
              </div>
              <div className="text-gray-400">
                <Atom className="h-12 w-12 mx-auto mb-2" />
                <p className="text-xs text-center">GEAR LAB</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
    </div>
  );
}
