import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, FileText, Info, HelpCircle, Users, Building2 } from "lucide-react";

interface PolicyDialogsProps {
  children: (openPrivacy: () => void, openTerms: () => void, openAbout: () => void, openHowItWorks: () => void) => React.ReactNode;
}

export const PolicyDialogs = ({ children }: PolicyDialogsProps) => {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);

  return (
    <>
      {children(
        () => setPrivacyOpen(true),
        () => setTermsOpen(true),
        () => setAboutOpen(true),
        () => setHowItWorksOpen(true)
      )}

      {/* Privacy Policy Dialog */}
      <Dialog open={privacyOpen} onOpenChange={setPrivacyOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-2xl">Privacy Policy</DialogTitle>
                <DialogDescription>Last updated: December 2024</DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-6 text-sm pr-4">
              <section>
                <h3 className="font-semibold text-base mb-2">1. Information We Collect</h3>
                <p className="text-muted-foreground mb-3">
                  At HostelGo, we collect information that you provide directly to us when you:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Create an account (name, email, password, role)</li>
                  <li>List a hostel property (hostel details, contact information)</li>
                  <li>Submit reviews or enquiries</li>
                  <li>Contact us for support</li>
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-base mb-2">2. How We Use Your Information</h3>
                <p className="text-muted-foreground mb-3">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Verify hostel listings and maintain platform security</li>
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-base mb-2">3. Data Security</h3>
                <p className="text-muted-foreground">
                  We implement appropriate technical and organizational measures to protect your personal information. 
                  However, no method of transmission over the Internet is 100% secure. While we strive to use 
                  commercially acceptable means to protect your data, we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-base mb-2">4. Your Rights</h3>
                <p className="text-muted-foreground mb-3">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Access and update your personal information</li>
                  <li>Delete your account and associated data</li>
                  <li>Opt-out of certain communications</li>
                  <li>Request a copy of your data</li>
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-base mb-2">5. Contact Us</h3>
                <p className="text-muted-foreground">
                  If you have questions about this Privacy Policy, please contact us at:
                  <br />
                  <strong>Email:</strong> privacy@hostelgo.pk
                  <br />
                  <strong>Phone:</strong> +92 300 1234567
                </p>
              </section>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Terms of Service Dialog */}
      <Dialog open={termsOpen} onOpenChange={setTermsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-2xl">Terms of Service</DialogTitle>
                <DialogDescription>Last updated: December 2024</DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-6 text-sm pr-4">
              <section>
                <h3 className="font-semibold text-base mb-2">1. Acceptance of Terms</h3>
                <p className="text-muted-foreground">
                  By accessing and using HostelGo, you accept and agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, please do not use our platform.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-base mb-2">2. User Accounts</h3>
                <p className="text-muted-foreground mb-3">
                  To use certain features of HostelGo, you must:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Notify us immediately of any unauthorized access</li>
                  <li>Be at least 18 years old or have parental consent</li>
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-base mb-2">3. Hostel Listings</h3>
                <p className="text-muted-foreground mb-3">
                  Hostel owners agree to:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Provide accurate and truthful information about their properties</li>
                  <li>Maintain up-to-date listing details</li>
                  <li>Respond promptly to student enquiries</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-base mb-2">4. Reviews and Content</h3>
                <p className="text-muted-foreground">
                  Users may post reviews and content, provided that such content is:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Accurate and based on personal experience</li>
                  <li>Not defamatory, offensive, or illegal</li>
                  <li>Not containing spam or promotional content</li>
                  <li>Respecting the privacy of others</li>
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-base mb-2">5. Prohibited Activities</h3>
                <p className="text-muted-foreground mb-3">
                  You agree not to:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Use the platform for any illegal purpose</li>
                  <li>Impersonate any person or entity</li>
                  <li>Interfere with or disrupt the platform</li>
                  <li>Attempt to gain unauthorized access to any part of the platform</li>
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-base mb-2">6. Limitation of Liability</h3>
                <p className="text-muted-foreground">
                  HostelGo acts as a platform connecting students and hostel owners. We do not guarantee 
                  the accuracy of listings or the quality of accommodations. Users are responsible for 
                  verifying information and making their own decisions.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-base mb-2">7. Contact Information</h3>
                <p className="text-muted-foreground">
                  For questions about these Terms of Service, contact us at:
                  <br />
                  <strong>Email:</strong> legal@hostelgo.pk
                  <br />
                  <strong>Phone:</strong> +92 300 1234567
                </p>
              </section>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* About Us Dialog */}
      <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Info className="h-5 w-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-2xl">About HostelGo</DialogTitle>
                <DialogDescription>Your trusted platform for student accommodation</DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-6 text-sm pr-4">
              <section>
                <h3 className="font-semibold text-base mb-2">Our Mission</h3>
                <p className="text-muted-foreground">
                  HostelGo is dedicated to making student accommodation search simple, safe, and reliable. 
                  We connect students with verified hostel listings across Pakistan, ensuring transparency 
                  and trust in every interaction.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-base mb-2">What We Do</h3>
                <p className="text-muted-foreground mb-3">
                  HostelGo provides a comprehensive platform where:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li><strong>Students</strong> can search, filter, and review verified hostels</li>
                  <li><strong>Hostel Owners</strong> can list their properties and manage bookings</li>
                  <li><strong>Administrators</strong> verify listings to ensure quality and safety</li>
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-base mb-2">Our Values</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-1">Verification</h4>
                    <p className="text-muted-foreground">
                      Every hostel listing is verified by our admin team to ensure authenticity and safety.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Transparency</h4>
                    <p className="text-muted-foreground">
                      We provide detailed information, reviews, and ratings to help you make informed decisions.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Student-Focused</h4>
                    <p className="text-muted-foreground">
                      Our platform is designed with students' needs in mind, prioritizing affordability and convenience.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-base mb-2">Platform Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-primary">50+</p>
                    <p className="text-xs text-muted-foreground">Verified Hostels</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-primary">5K+</p>
                    <p className="text-xs text-muted-foreground">Happy Students</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-primary">15+</p>
                    <p className="text-xs text-muted-foreground">Cities Covered</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-primary">4.5</p>
                    <p className="text-xs text-muted-foreground">Average Rating</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-base mb-2">Contact Us</h3>
                <p className="text-muted-foreground">
                  We'd love to hear from you! Reach out to us:
                  <br />
                  <strong>Email:</strong> support@hostelgo.pk
                  <br />
                  <strong>Phone:</strong> +92 300 1234567
                  <br />
                  <strong>Address:</strong> Lahore, Pakistan
                </p>
              </section>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* How It Works Dialog */}
      <Dialog open={howItWorksOpen} onOpenChange={setHowItWorksOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <HelpCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-2xl">How It Works</DialogTitle>
                <DialogDescription>Your guide to using HostelGo</DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-6 text-sm pr-4">
              {/* For Students */}
              <section>
                <h3 className="font-semibold text-base mb-3 flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  For Students
                </h3>
                <div className="space-y-4 ml-7">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Create Your Account</h4>
                      <p className="text-muted-foreground">
                        Sign up as a student to access verified hostel listings. It's free and takes less than a minute!
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Search & Filter</h4>
                      <p className="text-muted-foreground">
                        Use our smart search to find hostels by city, rent budget, and facilities. Filter results to match your preferences.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">View Details & Reviews</h4>
                      <p className="text-muted-foreground">
                        Explore hostel details, read authentic student reviews, and check ratings to make informed decisions.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Contact Hostel Owner</h4>
                      <p className="text-muted-foreground">
                        Send enquiries, schedule visits, or email directly to hostel owners. All verified hostels have responsive owners.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      5
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Share Your Experience</h4>
                      <p className="text-muted-foreground">
                        After visiting or staying, leave a review to help other students make better choices.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* For Hostel Owners */}
              <section>
                <h3 className="font-semibold text-base mb-3 flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  For Hostel Owners
                </h3>
                <div className="space-y-4 ml-7">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Register as Owner</h4>
                      <p className="text-muted-foreground">
                        Create an owner account and provide your contact information to start listing your properties.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Add Your Hostel</h4>
                      <p className="text-muted-foreground">
                        List your hostel with detailed information including location, rent, facilities, and photos.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Wait for Verification</h4>
                      <p className="text-muted-foreground">
                        Our admin team reviews and verifies your listing to ensure authenticity and quality standards.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Manage Enquiries</h4>
                      <p className="text-muted-foreground">
                        Respond to student enquiries and schedule visits directly through the platform. Keep your listing updated.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      5
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Build Your Reputation</h4>
                      <p className="text-muted-foreground">
                        Maintain high standards to receive positive reviews, which helps attract more students to your hostel.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Tips Section */}
              <section>
                <h3 className="font-semibold text-base mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Safety Tips
                </h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Always visit the hostel in person before making any payments</li>
                  <li>Verify the owner's identity and contact information</li>
                  <li>Read reviews from multiple students to get a complete picture</li>
                  <li>Check the hostel's verification status before contacting</li>
                  <li>Never share sensitive personal information unnecessarily</li>
                  <li>Report any suspicious listings or behavior to our support team</li>
                </ul>
              </section>

              {/* FAQ Section */}
              <section>
                <h3 className="font-semibold text-base mb-3">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">Is HostelGo free to use?</h4>
                    <p className="text-muted-foreground">
                      Yes! Creating an account and browsing hostels is completely free for students. Hostel owners can list their properties at no cost.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">How are hostels verified?</h4>
                    <p className="text-muted-foreground">
                      Our admin team manually reviews each listing, checks documentation, and verifies contact information to ensure authenticity.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Can I edit my review?</h4>
                    <p className="text-muted-foreground">
                      Yes, students can edit or delete their own reviews at any time from their dashboard.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">What if I have a complaint?</h4>
                    <p className="text-muted-foreground">
                      Contact our support team at support@hostelgo.pk. We take all complaints seriously and will investigate promptly.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

