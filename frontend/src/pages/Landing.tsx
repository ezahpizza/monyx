
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { NavBar, Copy, BouncyCardsFeatures, ClipPathLinks } from '@/components/landing';
import { WatermarkBackground } from '@/components/shared';

const Landing = () => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <div className="bg-rose relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden pointer-events-none select-none">
        <WatermarkBackground />
      </div>
      <NavBar />
      <section className="relative z-20 flex flex-col justify-end h-screen min-h-[600px]">
        <Copy />
      </section>
      <div className="relative z-30 -mt-12">
        <BouncyCardsFeatures />
      </div>
      <div className="relative z-30">
        <ClipPathLinks />
      </div>
    </div>
  );
};

export default Landing;