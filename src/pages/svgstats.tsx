import Layout from '@/components/Layout';
import SVGStat from '@/components/SVGStat';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '@/hooks/useTheme';
import { useEffect } from 'react';

const SVGStatsPage = () => {
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
        <title>统计</title>
        <meta name="description" content="跑步统计图表" />
      </Helmet>
      <div className="w-full">
        <h1 className="my-12 mt-6 text-center text-5xl font-extrabold italic">
          统计
        </h1>
        <SVGStat />
      </div>
    </Layout>
  );
};

export default SVGStatsPage;
