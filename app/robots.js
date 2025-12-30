export default function robots() {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
            },
        ],
        sitemap: "https://utkarsh-raj-portfolio.vercel.app/sitemap.xml",
    };
}
