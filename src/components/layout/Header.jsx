import { NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import Logo from "../../assets/Logo/log-header-logo.svg";
import { IoMdArrowDropdown } from "react-icons/io";

const navItems = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About Us",
    path: "/about",
    submenu: [
      { label: "Who We Are", path: "/about/who-we-are" },
      { label: "Our Team", path: "/about/our-team" },
      { label: "Awards & Accreditations", path: "/about/awards" },
      { label: "Partnerships", path: "/about/partnerships" },
      { label: "Careers", path: "/about/careers" },
      { label: "Success Stories", path: "/about/success-stories" },
    ],
  },
  {
    label: "Programs",
    path: "/programs",
    submenu: [
      { label: "Bootcamp", path: "/programs/bootcamp" },
      {
        label: "Holiday Camp",
        path: "/programs/holiday-camp",
        submenu: [
          { label: "Spring", path: "/programs/holiday-camp/spring" },
          { label: "Summer", path: "/programs/holiday-camp/summer" },
          { label: "Winter", path: "/programs/holiday-camp/winter" },
        ],
      },
      { label: "Innovation Labs", path: "/programs/innovation-labs" },
      { label: "Events & Competitions", path: "/programs/events-competitions" },
      { label: "Live Updates", path: "/programs/live-updates" },
    ],
  },
  {
    label: "Research & Media",
    path: "/research-media",
    submenu: [
      {
        label: "Research & Projects",
        path: "/research-media/research-projects",
      },
      { label: "Media & News", path: "/research-media/media-news" },
      { label: "Blogs", path: "/research-media/blogs" },
      { label: "Monthly Newsletters", path: "/research-media/newsletters" },
      { label: "Streamer", path: "/research-media/streamer" },
    ],
  },
  {
    label: "Community",
    path: "/community",
    submenu: [
      { label: "Join Our Community", path: "/community/join" },
      { label: "Schools", path: "/community/schools" },
      {
        label: "Colleges / Universities",
        path: "/community/colleges-universities",
      },
      {
        label: "Corporate / Industries",
        path: "/community/corporate-industries",
      },
      {
        label: "Adults / Professionals",
        path: "/community/adults-professionals",
      },
      { label: "Students", path: "/community/students" },
    ],
  },
  {
    label: "Resources",
    path: "/resources",
    submenu: [
      { label: "Student Portal", path: "/resources/student-portal" },
      { label: "Language Selector", path: "/resources/language-selector" },
      {
        label: "Downloads / Materials",
        path: "/resources/downloads-materials",
      },
      { label: "FAQs", path: "/resources/faqs" },
    ],
  },
  {
    label: "Contact",
    path: "/contact",
    submenu: [
      { label: "Contact Us", path: "/contact/contact-us" },
      { label: "Enquiry Now", path: "/contact/enquiry" },
      { label: "Book a Visit", path: "/contact/book-visit" },
    ],
  },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState([]);

  const toggleSubmenu = (path) => {
    setOpenSubmenus((current) =>
      current.includes(path)
        ? current.filter((item) => item !== path)
        : [...current, path],
    );
  };

  const closeMenu = () => {
    setOpen(false);
    setOpenSubmenus([]);
  };

  const renderNavItems = (items) =>
    items.map((item) => {
      const isOpen = openSubmenus.includes(item.path);

      return (
        <li
          key={item.path}
          className={
            item.submenu ? `has-submenu ${isOpen ? "is-open" : ""}` : ""
          }
        >
          <div className="nav-item-wrapper">
            <NavLink
              to={item.path}
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={closeMenu}
            >
              {item.label}
            </NavLink>

            {item.submenu && (
              <button
                className="submenu-toggle"
                type="button"
                aria-haspopup="true"
                aria-label={`Toggle submenu for ${item.label}`}
                aria-expanded={isOpen}
                onClick={() => toggleSubmenu(item.path)}
              >
                <IoMdArrowDropdown />
              </button>
            )}
          </div>

          {item.submenu && (
            <ul className="submenu">{renderNavItems(item.submenu)}</ul>
          )}
        </li>
      );
    });

  return (
    <header className="site-header">
      <div className="container header-inner">
        <NavLink to="/" className="brand" onClick={closeMenu}>
          <img src={Logo} alt="LOF Logo" />
        </NavLink>
        <button
          className="nav-toggle"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen((prev) => !prev)}
        >
          <FiMenu size={24} />
        </button>
        <nav
          className={`site-nav ${open ? "is-open" : ""}`}
          aria-label="Primary navigation"
        >
          <ul>{renderNavItems(navItems)}</ul>
        </nav>
        <div className="header-actions">
          <NavLink
            to="/student-portal"
            className="glass-btn glass-btn--light header-btn"
            onClick={closeMenu}
          >
            Enroll Now
          </NavLink>
          {/* <NavLink
            to="/contact"
            className="glass-btn glass-btn--dark header-btn"
            onClick={closeMenu}
          >
            Book a Demo
          </NavLink> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
