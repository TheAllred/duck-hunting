import InstagramFillIcon from "remixicon-react/InstagramFillIcon";

export function Footer() {
  return (
    <footer>
      <img
        src="https://cdn.discordapp.com/attachments/858075406191820810/1067217369904205864/full-trans-logo.png"
        alt="duck duck hunt logo"
        className="logo"
      />
      <div className="quick-links">
        <p>Quick Links</p>

        <a href="/about">About</a>
      </div>
      <div className="socials">
        <a href="https://www.instagram.com/duckduckhunt">
          <InstagramFillIcon color="#fff" />
        </a>
      </div>
    </footer>
  );
}
