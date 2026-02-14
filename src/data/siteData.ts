// Site-wide data and content for Springer Public School

export const schoolInfo = {
  name: "Springer Public School",
  tagline: "Shaping Minds. Building Futures.",
  description: "Council for the Indian School Certificate Examinations (10+2) affiliated institution",
  founded: 1992,
  address: "Gorakhpur, Uttar Pradesh, India",
  phone: "+917897012434",
  email: "springerpublicschool@gmail.com",
  email2: "info@springer.org.in",
  website: "www.springerpublicschool.edu.in",
  affiliation: "Affiliated to the Council for the Indian School Certificate Examinations (10+2), New Delhi [Affiliation / School Code: UP125]",
  portalUrl: "https://springer.campusconnecterp.com",
};

export const navigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Academics", href: "/academics" },
  { name: "Gallery", href: "/gallery" },
  { name: "Achievements", href: "/achievements" },
  { name: "Admissions", href: "/admissions" },
  { name: "Prospectus", href: "/prospectus" },
  { name: "Fees", href: "/fees-structure" },
  { name: "Notices", href: "/notices" },
  { name: "Contact", href: "/contact" },
];

export const whyChooseUs = [
  {
    id: 1,
    title: "Holistic Learning",
    description: "Comprehensive education focusing on academic excellence, character building, and life skills development.",
    icon: "Brain",
    color: "red",
  },
  {
    id: 2,
    title: "STEM Curriculum",
    description: "Cutting-edge Science, Technology, Engineering, and Mathematics programs with hands-on learning.",
    icon: "Cpu",
    color: "green",
  },
  {
    id: 3,
    title: "Safe Campus",
    description: "24/7 security, CCTV surveillance, and trained staff ensuring a safe learning environment.",
    icon: "Shield",
    color: "red",
  },
  {
    id: 4,
    title: "Expert Faculty",
    description: "Highly qualified and experienced teachers dedicated to nurturing every child's potential.",
    icon: "Users",
    color: "green",
  },
];

export const academicPrograms = [
  {
    id: "pre-primary",
    name: "Pre-Primary",
    grades: "Nursery - KG",
    age: "3-5 years",
    description: "Foundation years focusing on motor skills, social development, and early learning through play-based activities.",
    features: ["Activity-based learning", "Motor skill development", "Social interaction", "Creative expression"],
    image: "/images/class/1.webp",
  },
  {
    id: "primary",
    name: "Primary",
    grades: "Class 1-5",
    age: "6-10 years",
    description: "Building strong academic foundations with emphasis on reading, writing, arithmetic, and curiosity-driven learning.",
    features: ["Strong fundamentals", "Interactive learning", "Co-curricular activities", "Value education"],
    image: "/images/class/2.webp",
  },
  {
    id: "middle",
    name: "Middle School",
    grades: "Class 6-8",
    age: "11-13 years",
    description: "Transitional phase introducing specialized subjects, critical thinking, and independent learning skills.",
    features: ["Subject specialization", "Critical thinking", "Project-based learning", "Leadership skills"],
    image: "/images/class/3.webp",
  },
  {
    id: "senior",
    name: "Senior Secondary",
    grades: "Class 9-12",
    age: "14-17 years",
    description: "Preparation for board examinations and competitive entrances with career guidance and counseling.",
    features: ["Board preparation", "Career counseling", "Competitive exam coaching", "Stream selection"],
    image: "/images/class/4.webp",
  },
];

export const achievements = [
  { label: "Years of Excellence", value: 30, suffix: "+" },
  { label: "Total Students", value: 2500, suffix: "+" },
  { label: "Expert Faculty", value: 150, suffix: "+" },
  { label: "Board Results", value: 98, suffix: "%" },
];

export const facilities = [
  {
    id: 1,
    name: "Smart Classrooms",
    description: "Digital learning spaces with interactive boards and multimedia resources",
    image: "/images/smart_classroom.jpg",
  },
  {
    id: 2,
    name: "Science Labs",
    description: "Well-equipped Physics, Chemistry, and Biology laboratories",
    image: "/images/science_lab.jpg",
  },
  {
    id: 3,
    name: "Library",
    description: "Extensive collection of books, journals, and digital resources",
    image: "/images/library.jpg",
  },
  {
    id: 4,
    name: "Sports Ground",
    description: "Spacious grounds for cricket, football, athletics, and more",
    image: "/images/sports_ground.jpg",
  },
  {
    id: 5,
    name: "Transport",
    description: "Safe and comfortable bus service across the city",
    image: "/images/transport.jpg",
  },
];

export const faculty = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    subject: "Mathematics",
    experience: "15+ years",
    qualification: "Ph.D. in Mathematics",
    image: "/images/faculty_profile_01.jpg",
    bio: "Award-winning educator with expertise in making mathematics engaging and accessible.",
  },
  {
    id: 2,
    name: "Mr. Rajesh Kumar",
    subject: "Science",
    experience: "12+ years",
    qualification: "M.Sc. B.Ed.",
    image: "/images/faculty_profile_02.jpg",
    bio: "Passionate science educator who brings experiments to life in the classroom.",
  },
  {
    id: 3,
    name: "Mrs. Anjali Gupta",
    subject: "English Literature",
    experience: "18+ years",
    qualification: "M.A. B.Ed.",
    image: "/images/principal.jpg",
    bio: "Dedicated to fostering a love for literature and language among students.",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Mrs. Sunita Patel",
    role: "Parent of Class 8 Student",
    image: "/images/springer_asset/woman_vector.jpg",
    content: "Springer Public School has transformed my child's approach to learning. The teachers are incredibly supportive and the facilities are world-class. I couldn't have asked for a better school for my daughter.",
    rating: 5,
  },
  {
    id: 2,
    name: "Mr. Amit Verma",
    role: "Parent of Class 5 Student",
    image: "/images/springer_asset/man_vector.jpg",
    content: "The STEM programs at Springer are exceptional. My son has developed a keen interest in robotics and coding. The school's focus on holistic development is truly commendable.",
    rating: 5,
  },
];

export const stemPrograms = [
  {
    id: 1,
    title: "Robotics",
    description: "Hands-on robotics programming and building with LEGO Mindstorms and Arduino kits.",
    icon: "Bot",
    color: "red",
  },
  {
    id: 2,
    title: "Coding Basics",
    description: "Introduction to programming languages including Python, Scratch, and JavaScript.",
    icon: "Code",
    color: "green",
  },
  {
    id: 3,
    title: "AI Awareness",
    description: "Understanding artificial intelligence, machine learning basics, and ethical AI usage.",
    icon: "Brain",
    color: "red",
  },
  {
    id: 4,
    title: "Problem Solving",
    description: "Critical thinking and analytical skills through puzzles, challenges, and projects.",
    icon: "Puzzle",
    color: "green",
  },
  {
    id: 5,
    title: "Project-Based Learning",
    description: "Real-world projects that integrate multiple subjects and develop teamwork skills.",
    icon: "FolderGit",
    color: "red",
  },
];

export const admissionSteps = [
  {
    step: 1,
    title: "Online Registration",
    description: "Fill out the online application form with all required details and documents.",
  },
  {
    step: 2,
    title: "Document Verification",
    description: "Submit original documents for verification at the school office.",
  },
  {
    step: 3,
    title: "Entrance Assessment",
    description: "Age-appropriate assessment to understand the child's learning level.",
  },
  {
    step: 4,
    title: "Parent Interview",
    description: "Brief interaction with parents to understand expectations and alignment.",
  },
  {
    step: 5,
    title: "Fee Payment",
    description: "Complete admission by paying the required fees within the stipulated time.",
  },
];

export const blogPosts = [
  {
    id: 1,
    title: "5 Tips to Prepare Your Child for a New School Year",
    excerpt: "Help your child transition smoothly into the new academic year with these practical tips.",
    date: "2025-01-10",
    category: "Parent Guide",
    author: "School Counseling Team",
    image: "/images/hero_students_modern_classroom.jpg",
  },
  {
    id: 2,
    title: "The Importance of STEM Education in Today's World",
    excerpt: "Understanding why STEM skills are crucial for your child's future success.",
    date: "2025-01-05",
    category: "Education",
    author: "Dr. Priya Sharma",
    image: "/images/robotics_lab.jpg",
  },
  {
    id: 3,
    title: "Annual Day Celebration 2024 - A Grand Success",
    excerpt: "Highlights from our spectacular Annual Day celebration showcasing student talents.",
    date: "2024-12-20",
    category: "Event",
    author: "Events Committee",
    image: "/images/campus_exterior.jpg",
  },
];

export const coreValues = [
  {
    title: "Excellence",
    description: "Striving for the highest standards in education and character",
    icon: "Award",
  },
  {
    title: "Integrity",
    description: "Building honest and ethical individuals with strong moral values",
    icon: "Shield",
  },
  {
    title: "Innovation",
    description: "Embracing new ideas and creative approaches to learning",
    icon: "Lightbulb",
  },
  {
    title: "Inclusivity",
    description: "Creating a welcoming environment for students from all backgrounds",
    icon: "Heart",
  },
  {
    title: "Respect",
    description: "Fostering mutual respect among students, teachers, and community",
    icon: "Handshake",
  },
  {
    title: "Responsibility",
    description: "Developing accountable and socially responsible citizens",
    icon: "Scale",
  },
];

// Achievements highlights for home page
export const achievementsHighlights = [
  {
    id: 1,
    title: "National Science Olympiad Winners",
    description: "15 students qualified for National Level, 3 Gold Medals",
    icon: "Trophy",
    color: "red",
    year: "2024",
  },
  {
    id: 2,
    title: "State Basketball Champions",
    description: "Under-17 Boys Team - State Championship Winners",
    icon: "Award",
    color: "green",
    year: "2024",
  },
  {
    id: 3,
    title: "100% Board Results",
    description: "Class 10 & 12 - Outstanding Performance",
    icon: "GraduationCap",
    color: "red",
    year: "2024",
  },
  {
    id: 4,
    title: "Best STEM School Award",
    description: "Recognized for Excellence in STEM Education",
    icon: "Sparkles",
    color: "green",
    year: "2024",
  },
];

// Fees structure data
export const feesStructure = [
  {
    class: "Nursery - KG",
    admissionFee: "₹10,000",
    annualFee: "₹5,000",
    tuitionFee: "₹3,500/month",
    total: "₹57,000/year",
  },
  {
    class: "Class 1 - 5",
    admissionFee: "₹12,000",
    annualFee: "₹6,000",
    tuitionFee: "₹4,000/month",
    total: "₹66,000/year",
  },
  {
    class: "Class 6 - 8",
    admissionFee: "₹15,000",
    annualFee: "₹7,000",
    tuitionFee: "₹4,500/month",
    total: "₹76,000/year",
  },
  {
    class: "Class 9 - 10",
    admissionFee: "₹18,000",
    annualFee: "₹8,000",
    tuitionFee: "₹5,000/month",
    total: "₹86,000/year",
  },
  {
    class: "Class 11 - 12 (Science)",
    admissionFee: "₹20,000",
    annualFee: "₹10,000",
    tuitionFee: "₹6,000/month",
    total: "₹1,02,000/year",
  },
  {
    class: "Class 11 - 12 (Commerce)",
    admissionFee: "₹20,000",
    annualFee: "₹10,000",
    tuitionFee: "₹5,500/month",
    total: "₹96,000/year",
  },
];

