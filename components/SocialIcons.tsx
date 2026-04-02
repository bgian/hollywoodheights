interface SocialIconsProps {
  className?: string;
  fill?: string;
}

export function InstagramIcon({ fill = "currentColor" }: { fill?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g clipPath="url(#ig-clip)">
        <rect
          x="0.9375"
          y="0.9375"
          width="18.125"
          height="18.125"
          rx="4.6875"
          stroke={fill}
          strokeWidth="1.875"
        />
        <circle cx="10" cy="10" r="4.0625" stroke={fill} strokeWidth="1.875" />
        <circle cx="15.3125" cy="4.6875" r="1.5625" fill={fill} />
      </g>
      <defs>
        <clipPath id="ig-clip">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function FacebookIcon({ fill = "currentColor" }: { fill?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g clipPath="url(#fb-clip)">
        <path
          d="M10 0C15.5228 0 20 4.47714 20 10C19.9999 14.9912 16.3431 19.1277 11.5625 19.8779V12.8906H13.8926L14.3359 10H11.5625V8.12402C11.5625 8.07473 11.5643 8.02552 11.5674 7.97656C11.5705 7.9274 11.5755 7.87854 11.582 7.83008C11.595 7.73341 11.6148 7.63853 11.6426 7.54688C11.7818 7.08796 12.1179 6.70978 12.7656 6.59668C12.895 6.57408 13.0372 6.5625 13.1924 6.5625H14.4531V4.10156C14.4531 4.10156 13.577 3.95145 12.625 3.91406C12.4891 3.90872 12.3515 3.90625 12.2148 3.90625C11.5009 3.90625 10.8641 4.04127 10.3262 4.30371C10.2725 4.32989 10.2196 4.35704 10.168 4.38574C9.132 4.96123 8.49921 6.04275 8.44141 7.56543C8.43852 7.64147 8.4375 7.71864 8.4375 7.79688V10H5.89844V12.8906H8.4375V19.8779C3.65692 19.1277 5.49758e-05 14.9912 0 10C0 4.47714 4.47714 7.04394e-06 10 0Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="fb-clip">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default function SocialIcons({ className = "", fill }: SocialIconsProps) {
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      <a
        href="https://www.instagram.com/hollywood_heights_la/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow us on Instagram"
        className="transition-opacity duration-200 hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-hollywood-blue rounded-sm"
      >
        <InstagramIcon fill={fill} />
      </a>
      <a
        href="https://www.facebook.com/hollywoodheightsla/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow us on Facebook"
        className="transition-opacity duration-200 hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-hollywood-blue rounded-sm"
      >
        <FacebookIcon fill={fill} />
      </a>
    </div>
  );
}
