interface ISiteMetadataResult {
  siteTitle: string;
  siteUrl: string;
  description: string;
  logo: string;
  navLinks: {
    name: string;
    url: string;
  }[];
}

const getBasePath = () => {
  const baseUrl = import.meta.env.BASE_URL;
  return baseUrl === '/' ? '' : baseUrl;
};

const data: ISiteMetadataResult = {
  siteTitle: 'i自在 跑步主页',
  siteUrl: '',
  logo: '/assets/logo.jpg',
  description: 'i自在的个人跑步记录网站',
  navLinks: [
    {
      name: '概况',
      url: `${getBasePath()}/summary`,
    },
    {
      name: '统计',
      url: `${getBasePath()}/svgstats`,
    },
  ],
};

export default data;
