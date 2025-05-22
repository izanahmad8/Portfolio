const getCurrentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="w-full py-4 text-center">
      <p className="text-sm sm:text-base lg:text-lg ">
        &copy; {getCurrentYear} All Rights Reserved - Izan Ahmad
      </p>
    </footer>
  );
};

export default Footer;
