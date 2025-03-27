import Contact from '../Contact/Contact';
import { Divider } from '@mantine/core';
function ContactPage() {  // ✅ Rename function to avoid conflict
  return (
    <div className="min-h-screen bg-mine-shaft-950 font-['poppins']">
      <Divider color="#5a5a5a" size="xs" mx="md" />
      <Contact />  {/* Render the imported Contact component */}
    </div>
  );
}

export default ContactPage;
