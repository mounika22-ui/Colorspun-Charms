import "./Contact.css";

function Contact() {
  return (
    <div className="contact">

      <h1>Contact Us</h1>

      <form>

        <input type="text" placeholder="Your Name" />

        <input type="email" placeholder="Your Email" />

        <textarea
          placeholder="Your Message"
          rows="5"
        ></textarea>

        <button>Send Message</button>

      </form>

    </div>
  );
}

export default Contact;