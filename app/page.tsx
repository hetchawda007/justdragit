"use client"
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sessionverify = async () => {
      const session = await getSession();
      if (session) {
        redirect(`/dashboard/${session?.user?.name}`);
      } else {
        setIsLoading(false);
      }
    };
    sessionverify();
  }, []);

  if (isLoading) {
    return (
      <div className="text-white h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-xl"
        >
          Validating......
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen text-white">
      {/* Header/Nav Section */}
      <header className="container mx-auto py-6 px-4 md:px-6">
        <nav className="flex justify-between items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <Image src="/logo.png" alt="JustDragIt Logo" width={32} height={32} />
            <h1 className="text-2xl font-bold">JustDragIt</h1>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex gap-4">
              <Link href="/login" className="px-6 py-2 rounded-md bg-transparent border border-blue-500 hover:bg-blue-600/20 transition-all">
                Log in
              </Link>
            </div>
          </motion.div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto py-16 px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Simplify Your Workflow with <span className="text-blue-500">JustDragIt</span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto"
          >
            The intuitive drag-and-drop task manager that helps teams collaborate and get more done with less effort.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Link href="/login" className="px-8 py-3 text-lg bg-blue-500 hover:bg-blue-600 rounded-lg transition-all">
              Get Started — It&apos;s Free
            </Link>
          </motion.div>
        </div>

        {/* App Demo Preview */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 relative rounded-lg overflow-hidden shadow-2xl shadow-blue-500/20 border border-gray-800"
        >
          <div className="aspect-[16/9] bg-gray-800 rounded-lg flex items-center justify-center">
            {/* Replace with an actual screenshot of your app */}
            <div className="text-gray-400 text-lg">App Dashboard Preview</div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-20 px-4 md:px-6">
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          Powerful Features to <span className="text-blue-500">Boost Productivity</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: "🔄",
              title: "Intuitive Drag & Drop",
              description: "Easily move tasks between columns and reorganize your workflow with a simple drag and drop interface."
            },
            {
              icon: "👥",
              title: "Team Collaboration",
              description: "Invite team members, assign tasks, and track progress in real-time for seamless collaboration."
            },
            {
              icon: "🏷️",
              title: "Custom Labels & Tags",
              description: "Organize tasks with custom labels and tags to quickly filter and find what matters most."
            },
            {
              icon: "📊",
              title: "Visual Progress Tracking",
              description: "Monitor project progress with visual charts and statistics to stay on top of deadlines."
            },
            {
              icon: "🔔",
              title: "Smart Notifications",
              description: "Get timely reminders about upcoming deadlines and task assignments."
            },
            {
              icon: "📱",
              title: "Access Anywhere",
              description: "Use JustDragIt on any device with our responsive design that works on desktop and mobile."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto py-20 px-4 md:px-6 bg-gray-900/50 rounded-xl my-10">
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          How <span className="text-blue-500">JustDragIt</span> Works
        </motion.h2>

        <div className="space-y-20">
          {[
            {
              title: "Create Your Board",
              description: "Start by creating a new board for your project. Customize it with columns that match your workflow.",
              image: "board-creation.png"
            },
            {
              title: "Add Tasks and Details",
              description: "Create tasks with descriptions, due dates, and priority levels. Assign them to team members.",
              image: "task-creation.png"
            },
            {
              title: "Drag, Drop, and Done",
              description: "Move tasks between columns as they progress. Visualize your workflow and identify bottlenecks instantly.",
              image: "drag-drop.png"
            }
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8`}
            >
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-4">
                  <span className="inline-block bg-blue-500 w-8 h-8 rounded-full text-center mr-2">
                    {index + 1}
                  </span>
                  {step.title}
                </h3>
                <p className="text-gray-300 text-lg">{step.description}</p>
              </div>
              <div className="md:w-1/2 bg-gray-800 rounded-lg aspect-video flex items-center justify-center">
                {/* Replace with actual screenshots */}
                <div className="text-gray-500">Step {index + 1} Screenshot</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto py-20 px-4 md:px-6">
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          What Our Users Are <span className="text-blue-500">Saying</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              quote: "JustDragIt transformed how our team manages projects. The visual workflow is intuitive and keeps everyone aligned.",
              author: "Sarah Johnson",
              role: "Product Manager"
            },
            {
              quote: "The best task management tool I&apos;ve used. Simple enough for quick tasks, powerful enough for complex projects.",
              author: "Michael Chen",
              role: "Software Developer"
            },
            {
              quote: "We cut our meeting time in half because everyone can see the project status at a glance. Game changer!",
              author: "Alex Rodriguez",
              role: "Marketing Director"
            }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800/50 p-6 rounded-xl border border-gray-700"
            >
              <div className="text-2xl text-blue-400 mb-4">&quot;</div>
              <p className="text-gray-300 mb-6">{testimonial.quote}</p>
              <div>
                <p className="font-medium">{testimonial.author}</p>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto py-20 px-4 md:px-6">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-10 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Workflow?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of teams that use JustDragIt to simplify task management and boost productivity.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login" className="px-8 py-3 bg-white text-blue-600 hover:bg-gray-100 font-medium rounded-lg transition-all">
              Get Started for Free
            </Link>
            <Link href="/demo" className="px-8 py-3 bg-transparent border border-white hover:bg-white/10 rounded-lg transition-all">
              Watch Demo
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <Image src="/logo.png" alt="JustDragIt Logo" width={32} height={32} />
                <span className="text-xl font-bold">JustDragIt</span>
              </div>
              <p className="text-gray-400 max-w-md">
                The modern task management tool designed for teams who want to achieve more.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold mb-4">Product</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Integrations</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Updates</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Company</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-blue-400 transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Support</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Documentation</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Status</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500">© 2023 JustDragIt. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}