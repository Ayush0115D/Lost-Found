// src/data/stations.js

export const metroLines = [
  { value: 'red', label: 'Red Line', description: 'Rithala - Shaheed Sthal' },
  { value: 'blue', label: 'Blue Line', description: 'Dwarka Sector 21 - Noida Electronic City/Vaishali' },
  { value: 'yellow', label: 'Yellow Line', description: 'Samaypur Badli - HUDA City Centre' },
  { value: 'green', label: 'Green Line', description: 'Brigadier Hoshiar Singh - Kirti Nagar' },
  { value: 'violet', label: 'Violet Line', description: 'Kashmere Gate - Raja Nahar Singh' },
  { value: 'pink', label: 'Pink Line', description: 'Majlis Park - Shiv Vihar' },
  { value: 'magenta', label: 'Magenta Line', description: 'Janakpuri West - Botanical Garden' },
  { value: 'airport', label: 'Airport Express', description: 'New Delhi - Dwarka Sector 21' }
];

const stationsByLine = {
   red: [
    'Shaheed Sthal (New Bus Adda)', 'Hindon River', 'Arthala', 'Mohan Nagar', 'Shyam Park',
  'Rajendra Nagar', 'Raj Bagh', 'Shaheed Nagar', 'Dilshad Garden',
  'Jhilmil', 'Mansarovar Park', 'Shahdara', 'Welcome', 'Seelampur', 'Shastri Park',
  'Kashmere Gate', 'Tis Hazari', 'Pul Bangash', 'Pratap Nagar', 'Shastri Nagar',
  'Inderlok', 'Kanhaiya Nagar', 'Keshav Puram', 'Netaji Subhash Place', 'Kohat Enclave',
  'Pitampura', 'Rohini East', 'Rohini West', 'Rithala'
  ],
  yellow: [
    'Samaypur Badli', 'Rohini Sector 18,19', 'Haiderpur Badli Mor', 'Jahangirpuri', 'Adarsh Nagar', 'Azadpur', 'Model Town', 'GTB Nagar', 'Vishwa Vidyalaya', 'Vidhan Sabha', 'Civil Lines', 'Kashmere Gate', 'Chandni Chowk', 'Chawri Bazar', 'New Delhi', 'Rajiv Chowk', 'Patel Chowk', 'Central Secretariat', 'Udyog Bhawan', 'Lok Kalyan Marg', 'Jor Bagh', 'INA', 'AIIMS', 'Green Park', 'Hauz Khas', 'Malviya Nagar', 'Saket', 'Qutub Minar', 'Chhatarpur', 'Sultanpur', 'Ghitorni', 'Arjan Garh', 'Guru Dronacharya', 'Sikanderpur', 'MG Road', 'IFFCO Chowk', ' Millennium City Centre'
  ],
  blue: [
   'Dwarka Sector 21', 'Dwarka Sector 8', 'Dwarka Sector 9', 'Dwarka Sector 10',
  'Dwarka Sector 11', 'Dwarka Sector 12', 'Dwarka Sector 13', 'Dwarka Sector 14',
  'Dwarka', 'Dwarka Mor', 'Nawada', 'Uttam Nagar West', 'Uttam Nagar East',
  'Janakpuri West', 'Janakpuri East', 'Tilak Nagar', 'Subhash Nagar', 'Tagore Garden',
  'Rajouri Garden', 'Ramesh Nagar', 'Moti Nagar', 'Kirti Nagar', 'Shadipur',
  'Patel Nagar', 'Rajendra Place', 'Karol Bagh', 'Jhandewalan', 'R.K. Ashram Marg',
  'Rajiv Chowk', 'Barakhamba Road', 'Mandi House', 'Supreme Court', 'Pragati Maidan',
  'Indraprastha', 'Yamuna Bank', 'Akshardham', 'Mayur Vihar Phase-1', 'Mayur Vihar Extension', 'New Ashok Nagar',
  'Noida Sector 15', 'Noida Sector 16', 'Noida Sector 18', 'Botanical Garden',
  'Golf Course', 'Noida City Centre', 'Noida Sector 34', 'Noida Sector 52',
  'Noida Sector 59', 'Noida Sector 61', 'Noida Sector 62', 'Noida Electronic City',
  // Vaishali Branch
  'Laxmi Nagar', 'Nirman Vihar', 'Preet Vihar', 'Karkarduma', 'Anand Vihar',
  'Kaushambi', 'Vaishali'
  ],
  green: [
'Inderlok', 'Ashok Park Main', 'Punjabi Bagh', 'Shivaji Park', 'Madipur', 'Paschim Vihar East', 'Paschim Vihar West', 'Peeragarhi', 'Udyog Nagar', 'Maharaja Surajmal Stadium', 'Nangloi', 'Nangloi Railway Station', 'Rajdhani Park', 'Mundka', 'Mundka Industrial Area', 'Ghevra', 'Tikri Kalan', 'Tikri Border', 'Pandit Shree Ram Sharma', 'Bahadurgarh City', 'Brigadier Hoshiyar Singh'
  ],
  violet: [
    'Kashmere Gate', 'Lal Qila', 'Jama Masjid', 'Delhi Gate', 'ITO',
    'Mandi House', 'Janpath', 'Central Secretariat', 'Khan Market',
    'Jawaharlal Nehru Stadium', 'Jangpura', 'Lajpat Nagar', 'Moolchand',
    'Kailash Colony', 'Nehru Place', 'Kalkaji Mandir', 'Govindpuri',
    'Harkesh Nagar Okhla', 'Jasola Apollo', 'Sarita Vihar', 'Mohan Estate',
    'Tughlakabad', 'Badarpur Border', 'Sarai', 'NHPC Chowk', 'Mewla Maharajpur',
    'Sector 28', 'Badkhal Mor', 'Old Faridabad', 'Neelam Chowk Ajronda',
    'Bata Chowk', 'Escorts Mujesar', 'Sant Surdas (Sihi)', 'Raja Nahar Singh'
  ],
  pink: [
'Majlis Park', 'Azadpur', 'Shalimar Bagh', 'Netaji Subhash Place', 'Shakurpur', 'Punjabi Bagh West', 'ESI Hospital', 'Rajouri Garden', 'Mayapuri', 'Naraina Vihar', 'Delhi Cantt', 'Durgabai Deshmukh South Campus', 'Sir Vishweshwaraiah Moti Bagh', 'Bhikaji Cama Place', 'Sarojini Nagar', 'INA', 'South Extension', 'Lajpat Nagar', 'Vinobapuri', 'Ashram', 'Hazrat Nizamuddin', 'Mayur Vihar I', 'Mayur Vihar Pocket I', 'Trilokpuri Sanjay Lake', 'Vinod Nagar East', 'Mandawali - West Vinod Nagar', 'IP Extension', 'Anand Vihar', 'Karkarduma', 'Karkarduma Court', 'Krishna Nagar', 'East Azad Nagar', 'Welcome', 'Jaffrabad', 'Maujpur-Babarpur', 'Gokulpuri', 'Johri Enclave', 'Shiv Vihar'
  ],
  magenta: [
   'Janakpuri West', 'Dabri Mor - Janakpuri South', 'Dashrath Puri', 'Palam', 'Sadar Bazaar Cantonment', 'Terminal 1-IGI Airport', 'Shankar Vihar', 'Vasant Vihar', 'Munirka', 'R.K. Puram', 'IIT Delhi', 'Hauz Khas', 'Panchsheel Park', 'Chirag Delhi', 'Greater Kailash', 'Nehru Enclave', 'Kalkaji Mandir', 'Okhla NSIC', 'Sukhdev Vihar', 'Jamia Millia Islamia', 'Okhla Vihar', 'Jasola Vihar Shaheen Bagh', 'Kalindi Kunj', 'Okhla Bird Sanctuary', 'Botanical Garden'
  ],
  grey: [
    'Dwarka', 'Najafgarh', 'Dhansa Bus Stand'
  ],
  airport: [
    'New Delhi', 'Shivaji Stadium', 'Dhaula Kuan', 'Delhi Aerocity',
    'Airport', 'Dwarka Sector 21'
  ]
};

export const getStationsForLine = (line) => {
  return (stationsByLine[line] || []).map((station) => ({
    label: station,
    value: station
  }));
};

export const stations = Object.entries(stationsByLine).flatMap(([lineKey, stationNames]) =>
  stationNames.map((name) => ({
    label: name,
    value: name,
    line: metroLines.find((l) => l.value === lineKey)?.label || lineKey
  }))
);
