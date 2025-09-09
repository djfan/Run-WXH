import Layout from '@/components/Layout';
import ActivityList from '@/components/ActivityList';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '@/hooks/useTheme';
import { useEffect } from 'react';

const HomePage = () => {
  // Use the theme hook to get the current theme
  const { theme } = useTheme();

  // Apply theme changes to the document when theme changes
  useEffect(() => {
    const htmlElement = document.documentElement;
    // Set explicit theme attribute
    htmlElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Layout>
      <Helmet>
        {/* Set HTML attributes including theme */}
        <html lang="en" data-theme={theme} />
        <title>Summary</title>
        <meta name="description" content="Running activity summary" />
      </Helmet>
      <div className="w-full">
        <h1 className="my-12 mt-6 text-center text-5xl font-extrabold italic">
          Summary
        </h1>
        <ActivityList />
      </div>
    </Layout>
  );
};

export default HomePage;
