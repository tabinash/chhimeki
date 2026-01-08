import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Logo from "../Logo";

export default function LandingFooter() {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1 flex flex-col items-start">
                        <div className="mb-4">
                            <Logo variant="dark" size="md" className="!items-start" />
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            Nepal's first hyper-local social network. Connecting neighbors, building communities.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                <Facebook className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-pink-50 hover:text-pink-600 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:text-blue-400 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Links Column 1 */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><Link href="#" className="hover:text-blue-600 transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-blue-600 transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-blue-600 transition-colors">Press</Link></li>
                            <li><Link href="#" className="hover:text-blue-600 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-6">Resources</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><Link href="#" className="hover:text-blue-600 transition-colors">Community Guidelines</Link></li>
                            <li><Link href="#" className="hover:text-blue-600 transition-colors">Safety Tips</Link></li>
                            <li><Link href="#" className="hover:text-blue-600 transition-colors">Business Support</Link></li>
                            <li><Link href="#" className="hover:text-blue-600 transition-colors">Help Center</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 3 */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-6">Legal</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><Link href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-blue-600 transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Chhimeki Inc. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <span>Made with ❤️ in Nepal</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
