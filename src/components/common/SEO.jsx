import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, url, image, keywords = [], author = 'LOF Studio' }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
    <meta name="author" content={author} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={url} />
    {image && <meta property="og:image" content={image} />}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    {image && <meta name="twitter:image" content={image} />}
  </Helmet>
);

export default SEO;
