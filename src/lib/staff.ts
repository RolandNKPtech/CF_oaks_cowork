// Staff data — ported from constants/staff.php

export interface StaffMember {
  img: string;
  title: string;
  subtitle: string;
  link: string;
}

export interface StaffSection {
  header: string;
  members: StaffMember[];
}

export const STAFF_SECTIONS: StaffSection[] = [
  {
    header: "Dermatologists",
    members: [
      { img: "/img/staff/connie-wang.jpg", title: "Connie Wang, MD, FAAD", subtitle: "Board-Certified Dermatologist & Founder", link: "https://www.elitedermatology.com/provider/connie-wang-md-faad" },
      { img: "/img/staff/christopher-ritzk.jpg", title: "Christopher Rizk, MD, FAAD", subtitle: "Board-Certified Dermatologist & Founder", link: "https://www.elitedermatology.com/provider/christopher-rizk-md-faad" },
      { img: "/img/staff/danielle-applebaum.jpg", title: "Danielle Applebaum, MD, FAAD", subtitle: "Board-Certified Dermatologist", link: "https://www.elitedermatology.com/provider/danielle-applebaum-md-faad" },
      { img: "/img/staff/andrew-fischer.jpg", title: "Andrew Fischer, MD, FAAD", subtitle: "Board-Certified Dermatologist & Dermatopathologist", link: "https://www.elitedermatology.com/provider/andrew-fischer-md-faad" },
      { img: "/img/staff/jennifer-boulavsky.jpg", title: "Jessica Boulavsky, MD, FAAD", subtitle: "Board-Certified Dermatologist", link: "https://www.elitedermatology.com/provider/jessica-boulavsky-md-faad" },
      { img: "/img/staff/muneeza-muhammad-circle-staff-photo.jpg", title: "Muneeza Muhammad, MD, FAAD", subtitle: "Board-Certified Dermatologist", link: "https://www.elitedermatology.com/provider/muneeza-muhammad-md-faad" },
      { img: "/img/staff/jacqueline-witt.jpg", title: "Jacqueline Witt, MD, FAAD", subtitle: "Board-Certified Dermatologist", link: "https://www.elitedermatology.com/provider/jacqueline-witt-md-faad" },
      { img: "/img/staff/diana-mannschreck.jpg", title: "Diana Mannschreck, MD, FAAD", subtitle: "Board-Certified Dermatologist", link: "https://www.elitedermatology.com/provider/diana-mannschreck-md-faad" },
      { img: "/img/staff/shelley-sekula-gibbs.jpg", title: "Shelley Sekula-Gibbs, MD, FAAD", subtitle: "Board-Certified Dermatologist", link: "https://www.elitedermatology.com/provider/shelley-sekula-gibbs-md-faad" },
      { img: "/img/staff/noori-kim.jpg", title: "Noori Kim, MD, FAAD", subtitle: "Board-Certified Dermatologist", link: "https://www.elitedermatology.com/provider/noori-kim-md-faad" },
      { img: "/img/staff/carly-dunn.jpg", title: "Carly Dunn, MD, FAAD", subtitle: "Board-Certified Dermatologist", link: "https://www.elitedermatology.com/provider/carly-dunn-md-faad" },
      { img: "/img/staff/Dr-Kwon.jpg", title: "Christina Kwon, MD, FAAD", subtitle: "Board-Certified Dermatologist", link: "https://www.elitedermatology.com/provider/christina-kwon-md" },
      { img: "/img/staff/Dr.-Workman.jpg", title: "Ellie Workman, MD, FAAD", subtitle: "Board-Certified Dermatologist", link: "https://www.elitedermatology.com/provider/ellie-workman-md" },
      { img: "/img/staff/dr-khalfe.jpg", title: "Yasmin Khalfe, MD, FAAD", subtitle: "Board-Certified Dermatologist", link: "https://www.elitedermatology.com/provider/yasmin-khalfe-md" },
      { img: "/img/staff/Dr.-Adler.jpg", title: "Alissa Adler, MD, FAAD", subtitle: "Board-Certified Dermatologist", link: "https://www.elitedermatology.com/provider/alissa-adler-md/" },
    ],
  },
  {
    header: "Dermatologic Surgeons",
    members: [
      { img: "/img/staff/dr-alkul.jpg", title: "Suzanne Alkul, MD, FAAD, FACMS", subtitle: "Board-Certified Dermatologist & Fellowship Trained Mohs Surgeon", link: "https://www.elitedermatology.com/provider/suzanne-alkul-md-faad" },
      { img: "/img/staff/Dr.-Andrew-Armenta.jpg", title: "Andrew Armenta, MD, FAAD, FACMS", subtitle: "Board-Certified Dermatologist & Fellowship Trained Mohs Surgeon", link: "https://www.elitedermatology.com/provider/andrew-armenta-md-faad-facms" },
    ],
  },
  {
    header: "Plastic Surgeons",
    members: [
      { img: "/img/staff/danielle-andry.jpg", title: "Danielle Andry, MD", subtitle: "Board-Certified Plastic Surgeon", link: "https://www.elitedermatology.com/provider/danielle-andry-md" },
      { img: "/img/staff/nandi-wijay.jpg", title: "Nandi Wijay, MD", subtitle: "Plastic Surgeon", link: "https://www.elitedermatology.com/provider/nandi-wijay-md" },
      { img: "/img/staff/dr-sawan-headshot.jpg", title: "Tareq Sawan, MD", subtitle: "Lead Facial Plastic Surgeon", link: "https://www.elitedermatology.com/provider/tareq-sawan-md" },
    ],
  },
  {
    header: "Physician Assistants & Nurses",
    members: [
      { img: "/img/staff/kelly-mack.jpg", title: "Kelly Mack, PA-C", subtitle: "Certified Physician Assistant", link: "https://www.elitedermatology.com/provider/kelly-mack-pa-c" },
      { img: "/img/staff/rachel-werner.jpg", title: "Rachel Werner, PA-C", subtitle: "Certified Physician Assistant", link: "https://www.elitedermatology.com/provider/rachel-werner-pa-c" },
      { img: "/img/staff/Leah-Smythe.jpg", title: "Leah Smythe, PA-C", subtitle: "Certified Physician Assistant", link: "https://www.elitedermatology.com/provider/leah-smythe-mpas/" },
      { img: "/img/staff/Piipar-Rivera.jpg", title: "Piipar Rivera, PA-C", subtitle: "Certified Physician Assistant", link: "https://www.elitedermatology.com/provider/piipar-rivera-mcmsc/" },
      { img: "/img/staff/Annie-Chang-Physician-Assitant.jpg", title: "Annie Chang, PA-C", subtitle: "Certified Physician Assistant", link: "https://www.elitedermatology.com/provider/annie-chang-mpas/" },
      { img: "/img/staff/victoria-keller.jpg", title: "Victoria Keller, RN", subtitle: "Advanced Nurse Injector", link: "https://www.elitedermatology.com/provider/victoria-keller-rn" },
    ],
  },
  {
    header: "Aestheticians & Cosmetic Consultants",
    members: [
      { img: "/img/staff/alexandria-hennig-la-llt.jpg", title: "Alexandria Hennig, LA, LLT", subtitle: "Licensed Aesthetician & Laser Technician", link: "https://www.elitedermatology.com/provider/alexandria-hennig-la-llt" },
      { img: "/img/staff/jennifer-swisher.jpg", title: "Jennifer Swisher, LA, LLT", subtitle: "Licensed Aesthetician & Laser Technician", link: "https://www.elitedermatology.com/provider/jennifer-swisher-la" },
      { img: "/img/staff/JohannaPic.jpg", title: "Johanna Villamizar", subtitle: "Patient Care Coordinator", link: "https://www.elitedermatology.com/provider/johanna-villamizar" },
      { img: "/img/staff/mai-nguyen.jpg", title: "Mai Nguyen", subtitle: "Patient Care Coordinator", link: "https://www.elitedermatology.com/provider/mai-nguyen" },
      { img: "/img/staff/Reese-Wilson-Patient-Care-Coordinator.jpg", title: "Reese Wilson", subtitle: "Patient Care Coordinator", link: "https://www.elitedermatology.com/provider/reese-wilson" },
    ],
  },
];
