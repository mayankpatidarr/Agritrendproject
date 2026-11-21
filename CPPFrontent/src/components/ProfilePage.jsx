import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Phone, Briefcase, Calendar, LogOut, Edit } from 'lucide-react';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [storedUser, setStoredUser] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Hydrate from localStorage in case of page refresh or context not yet ready
  useEffect(() => {
    try {
      const raw = localStorage.getItem('user');
      if (raw) {
        setStoredUser(JSON.parse(raw));
      }
    } catch {}
  }, []);

  const displayUser = useMemo(() => {
    // Priority: context user → localStorage user → empty
    const u = user || storedUser || {};
    const firstName = u.firstName || u.firstname || u.given_name || '';
    const lastName = u.lastName || u.lastname || u.family_name || '';
    const fullName = `${firstName} ${lastName}`.trim() || u.name || u.username || 'User';
    const email = u.email || u.mail || u.userEmail || '—';
    const phone = u.phone || u.mobile || u.phoneNumber || u.contact || '—';
    const profession = u.profession || u.role || u.occupation || 'Member';
    const createdAt = u.createdAt || u.created_at || u.joinedAt || u.joined_at || null;
    return { fullName, email, phone, profession, createdAt };
  }, [user, storedUser]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sidebar card */}
            <Card className="lg:col-span-1 shadow-lg border-0">
              <CardHeader>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-md">
                  <User className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="mt-4 text-2xl">{displayUser.fullName}</CardTitle>
                <p className="text-gray-500">{displayUser.profession}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={() => navigate('/settings')} variant="outline" className="w-full justify-start">
                  <Edit className="h-4 w-4 mr-2" /> Edit Profile
                </Button>
                <Button onClick={logout} variant="destructive" className="w-full justify-start">
                  <LogOut className="h-4 w-4 mr-2" /> Logout
                </Button>
              </CardContent>
            </Card>

            {/* Details card */}
            <Card className="lg:col-span-2 shadow-xl border-0">
              <CardHeader>
                <CardTitle>Profile Details</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-white/70 border border-gray-100">
                  <div className="flex items-center text-gray-700">
                    <Mail className="h-4 w-4 mr-2 text-green-600" /> Email
                  </div>
                  <p className="mt-1 font-medium">{displayUser.email}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/70 border border-gray-100">
                  <div className="flex items-center text-gray-700">
                    <Phone className="h-4 w-4 mr-2 text-green-600" /> Phone
                  </div>
                  <p className="mt-1 font-medium">{displayUser.phone}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/70 border border-gray-100">
                  <div className="flex items-center text-gray-700">
                    <Briefcase className="h-4 w-4 mr-2 text-green-600" /> Profession
                  </div>
                  <p className="mt-1 font-medium">{displayUser.profession}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/70 border border-gray-100">
                  <div className="flex items-center text-gray-700">
                    <Calendar className="h-4 w-4 mr-2 text-green-600" /> Member Since
                  </div>
                  <p className="mt-1 font-medium">{displayUser.createdAt ? new Date(displayUser.createdAt).toLocaleDateString() : '—'}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
