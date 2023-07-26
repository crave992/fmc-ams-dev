import Link from "next/link"

export default function Footer() {
    return (
      <footer className="text-center bg-gray-800 text-gray-400 py-3">
        <div className="flex flex-row justify-between container mx-auto">
          <p>FMC Research Solutions, Inc. © 2020.</p>
          <p>Designed by <Link href="https://www.fmc-research.com/">FMC Research Solutions</Link></p>
        </div>
      </footer>
    )
  }