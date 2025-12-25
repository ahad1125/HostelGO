import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Calendar, User, MapPin, Building2, Loader2, Send } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { enquiryApi, Enquiry } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const OwnerEnquiries = () => {
  const navigate = useNavigate();
  const { user, isLoading: isAuthLoading } = useAuth();
  const { toast } = useToast();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const [showReplyDialog, setShowReplyDialog] = useState(false);

  useEffect(() => {
    if (isAuthLoading) return;

    if (!user) {
      navigate("/login");
      return;
    }
    if (user.role !== "owner") {
      navigate("/");
      return;
    }

    fetchEnquiries();
  }, [user, isAuthLoading, navigate]);

  const fetchEnquiries = async () => {
    setIsLoading(true);
    try {
      const data = await enquiryApi.getByOwner();
      setEnquiries(data);
    } catch (error: any) {
      toast({
        title: "Error loading enquiries",
        description: error.message || "Failed to fetch enquiries",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleReplyClick = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry);
    setReplyMessage(enquiry.reply || "");
    setShowReplyDialog(true);
  };

  const handleSendReply = async () => {
    if (!selectedEnquiry || !replyMessage.trim()) return;

    setIsReplying(true);
    try {
      await enquiryApi.reply(selectedEnquiry.id, replyMessage);
      toast({
        title: "Reply sent!",
        description: "Your reply has been sent to the student",
      });
      setShowReplyDialog(false);
      setReplyMessage("");
      setSelectedEnquiry(null);
      fetchEnquiries();
    } catch (error: any) {
      toast({
        title: "Failed to send reply",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsReplying(false);
    }
  };

  const pendingEnquiries = enquiries.filter(e => e.status === 'pending').length;
  const enquiryCount = enquiries.length;

  if (isLoading || isAuthLoading) {
    return (
      <DashboardLayout role="owner" title="Enquiries" subtitle="Student enquiries and scheduled visits">
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Loading enquiries...</span>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="owner" title="Enquiries" subtitle="Student enquiries and scheduled visits">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{enquiryCount}</p>
                <p className="text-sm text-muted-foreground">Total Enquiries</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-warning/20 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingEnquiries}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{new Set(enquiries.map(e => e.hostel_id)).size}</p>
                <p className="text-sm text-muted-foreground">Hostels with Enquiries</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enquiries List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-heading">Student Enquiries</CardTitle>
          {pendingEnquiries > 0 && (
            <Badge variant="destructive">{pendingEnquiries} Pending</Badge>
          )}
        </CardHeader>
        <CardContent>
          {enquiries.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-heading text-lg font-semibold mb-2">No Enquiries Yet</h3>
              <p className="text-muted-foreground">You'll see student enquiries and scheduled visits here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {enquiries.map((enquiry) => (
                <Card key={enquiry.id} className="border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start gap-3">
                          {enquiry.type === 'schedule_visit' ? (
                            <Calendar className="h-5 w-5 text-primary mt-0.5" />
                          ) : (
                            <Mail className="h-5 w-5 text-primary mt-0.5" />
                          )}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant={enquiry.type === 'schedule_visit' ? 'default' : 'secondary'}>
                                {enquiry.type === 'schedule_visit' ? 'Scheduled Visit' : 'General Enquiry'}
                              </Badge>
                              <Badge variant={enquiry.status === 'pending' ? 'destructive' : 'outline'}>
                                {enquiry.status === 'pending' ? 'Pending' : 'Responded'}
                              </Badge>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{enquiry.student_name || 'Unknown Student'}</span>
                                <span className="text-muted-foreground">({enquiry.student_email})</span>
                              </div>
                              
                              <div className="flex items-center gap-2 text-sm">
                                <Building2 className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{enquiry.hostel_name}</span>
                              </div>
                              
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">{enquiry.hostel_address}, {enquiry.hostel_city}</span>
                              </div>

                              {enquiry.type === 'schedule_visit' && enquiry.scheduled_date && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-muted-foreground">
                                    Scheduled: <span className="font-medium">{formatDate(enquiry.scheduled_date)}</span>
                                  </span>
                                </div>
                              )}

                              {enquiry.message && (
                                <div className="mt-3 p-3 bg-muted rounded-lg">
                                  <p className="text-sm font-medium mb-1">Student Message:</p>
                                  <p className="text-sm text-foreground">{enquiry.message}</p>
                                </div>
                              )}

                              {enquiry.reply && (
                                <div className="mt-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
                                  <p className="text-sm font-medium mb-1">Your Reply:</p>
                                  <p className="text-sm text-foreground">{enquiry.reply}</p>
                                  <div className="text-xs text-muted-foreground mt-2">
                                    Replied: {formatDate(enquiry.replied_at)}
                                  </div>
                                </div>
                              )}

                              <div className="text-xs text-muted-foreground mt-2">
                                Received: {formatDate(enquiry.created_at)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant={enquiry.status === 'pending' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => handleReplyClick(enquiry)}
                        >
                          <Send className="h-4 w-4 mr-2" />
                          {enquiry.reply ? 'Edit Reply' : 'Reply'}
                        </Button>
                        {enquiry.student_email && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.location.href = `mailto:${enquiry.student_email}?subject=Re: Enquiry about ${enquiry.hostel_name}`}
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            Email
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reply Dialog */}
      <Dialog open={showReplyDialog} onOpenChange={setShowReplyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reply to Enquiry</DialogTitle>
            <DialogDescription>
              Send a reply to {selectedEnquiry?.student_name || 'the student'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedEnquiry?.message && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-1">Student's Message:</p>
                <p className="text-sm text-muted-foreground">{selectedEnquiry.message}</p>
              </div>
            )}
            <div>
              <Label htmlFor="reply-message">Your Reply</Label>
              <Textarea
                id="reply-message"
                placeholder="Type your reply here..."
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                rows={6}
                className="mt-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowReplyDialog(false);
              setReplyMessage("");
              setSelectedEnquiry(null);
            }} disabled={isReplying}>
              Cancel
            </Button>
            <Button onClick={handleSendReply} disabled={!replyMessage.trim() || isReplying}>
              {isReplying ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Reply
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default OwnerEnquiries;

