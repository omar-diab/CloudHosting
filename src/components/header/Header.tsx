import Link from "next/link";
import { GrTechnology } from "react-icons/gr";
import Navbar from "./Navbar";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";
import styles from "./header.module.css";
import LogoutButton from "./LogoutButton";

const Header = () => {
  const token = cookies().get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(token);

  return (
    <header className={styles.header}>
      <nav className={styles.navBar}>
        <div>
          <Link href="/" className={styles.logo}>
            CLOUD
            <GrTechnology />
            HOSTING
          </Link>
        </div>
        <Navbar isAdmin={payload?.isAdmin || false}/>
      </nav>

      <div className={styles.right}>
        {payload ? (
          <>
            <strong className="text-blue-800 text-2xl max-md:text-xl capitalize">
              {payload.username}
            </strong>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link className={styles.btn} href="/login">
              Log in
            </Link>
            <Link className={styles.btn} href="/signup">
              Sign up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
