// Category grid data — ported from includes/components/category-4.php and category-3.php

export interface CategoryItem {
  href: string;
  text: string;
}

export interface Category {
  colClass: string;
  imgUrl: string;
  label: string;
  items: CategoryItem[];
}

// Top 4 categories (homepage top grid — category-4.php)
export const CATEGORIES_TOP: Category[] = [
  {
    colClass: "12 col-md-6 col-lg-3",
    imgUrl: "/img/doctor-category-1.png",
    label: "Face",
    items: [
      { href: "/houston-facelift", text: "Facelift" },
      { href: "/houston-necklift", text: "Necklift" },
      { href: "/blepharoplasty-surgery-houston", text: "Eyelid Surgery" },
      { href: "/houston-eyebrow-lift", text: "Brow Lift" },
      { href: "/ear-pinning-houston", text: "Ear Pinning (Otoplasty)" },
      { href: "/chin-augmentation-houston", text: "Chin Augmentation" },
      { href: "/cheek-augmentation-houston", text: "Cheek Augmentation" },
      { href: "/houston-nose-jobs", text: "Nose Job (Rhinoplasty)" },
      { href: "/facial-fat-grafting-houston", text: "Fat Grafting/Fat Transfer/Nanofat" },
      { href: "/buccal-fat-removal", text: "Buccal Fat Removal" },
      { href: "/hair-restoration-houston", text: "Hair Transplant" },
      { href: "/lip-lift-houston", text: "Lip Lift" },
    ],
  },
  {
    colClass: "12 col-md-6 col-lg-3",
    imgUrl: "/img/doctor-category-2.png",
    label: "BREAST",
    items: [
      { href: "/mommy-makeover-houston", text: "Mommy Makeover" },
      { href: "/breast-augmentation-houston", text: "Breast Augmentation" },
      { href: "/breast-lift-surgery-houston", text: "Breast Lift (Mastopexy)" },
      { href: "/breast-reduction-houston", text: "Breast Reduction" },
      { href: "#", text: "Breast Lift with Augmentation (Augmentation Mastopexy)" },
      { href: "/gynecomastia-houston", text: "Male Breast Reduction (Gynecomastia)" },
      { href: "/breast-reconstruction-houston", text: "Breast Reconstruction" },
      { href: "/breast-implant-removal", text: "Breast Implant Removal" },
      { href: "/inverted-nipple-houston", text: "Inverted Nipple" },
      { href: "/nipple-reduction-houston", text: "Nipple Reduction" },
    ],
  },
  {
    colClass: "12 col-md-6 col-lg-3",
    imgUrl: "/img/doctor-category-3.png",
    label: "Body",
    items: [
      { href: "/mommy-makeover-houston", text: "Mommy Makeover" },
      { href: "/houston-tummy-tucks", text: "Tummy Tuck" },
      { href: "/butt-lift-houston", text: "Brazilian Butt Lift" },
      { href: "#", text: "Mini Tummy Tuck (Mini Abdominoplasty)" },
      { href: "/labiaplasty-houston", text: "Labiaplasty/ Labia Reduction" },
      { href: "/houston-vaginoplasty", text: "Vaginoplasty" },
      { href: "/liposuction-houston", text: "Liposuction" },
      { href: "/arm-lift-houston", text: "Arm Lift (Brachioplasty)" },
      { href: "/lipectomy-houston", text: "Back Lift" },
      { href: "/thigh-lift-houston", text: "Thigh Lift (thighplasty)" },
      { href: "/lipectomy-houston", text: "Lower Body Lift (Belt Lipectomy or Saddle Bags)" },
    ],
  },
  {
    colClass: "12 col-md-6 col-lg-3",
    imgUrl: "/img/doctor-category-4.png",
    label: "Injectables / Med Spa",
    items: [
      { href: "/houston-botox", text: "Botox and Dysport" },
      { href: "/fillers-houston", text: "Facial Fillers" },
      { href: "/chemical-peel-houston", text: "Chemical Peel" },
      { href: "/vampire-facial-houston", text: "Vampire Facial" },
      { href: "/microneedling-houston", text: "Microneedling" },
      { href: "/microdermabrasion-houston", text: "Microdermabrasion" },
      { href: "/kybella-houston", text: "Kybella" },
      { href: "/houston-skin-care-clinic", text: "Skin Care" },
    ],
  },
];

// Bottom 3 categories (homepage bottom grid — category-3.php)
export const CATEGORIES_BOTTOM: Category[] = [
  {
    colClass: "12 col-md-6 col-lg-4",
    imgUrl: "/img/doctor-category-6.png",
    label: "RECONSTRUCTION",
    items: [
      { href: "/breast-reconstruction-houston", text: "Breast Reconstruction" },
      { href: "/reconstructive-lumpectomy-surgery-houston", text: "Reconstruction of Lumpectomy Defects" },
      { href: "/breast-reduction-houston", text: "Breast Reduction" },
      { href: "/migraine-treatment-houston", text: "Surgical Migraine Treatment" },
      { href: "/carpal-tunnel-surgery-houston", text: "Carpal Tunnel Surgery" },
      { href: "/cubital-tunnel-surgery-houston", text: "Cubital Tunnel Surgery" },
      { href: "/trigger-finger-release-surgery-houston", text: "Trigger Finger Release" },
      { href: "/dupuytrens-disease-surgery-houston", text: "Dupuytren\u2019s Disease" },
      { href: "/facial-skin-cancer-reconstruction-houston", text: "Facial Cancer Reconstruction" },
      { href: "/mass-excision-houston", text: "Mass Excision" },
      { href: "/massive-weight-loss-surgery", text: "Massive Weight Loss" },
      { href: "/scar-revision-houston-tx", text: "Scar Revision" },
      { href: "/c-section-closure-surgery-houston", text: "Plastic Surgery Closure for C-Section" },
    ],
  },
  {
    colClass: "12 col-md-6 col-lg-4",
    imgUrl: "/img/doctor-category-7.png",
    label: "MALE",
    items: [
      { href: "/gynecomastia-houston", text: "Male Breast Reduction (Gynecomastia)" },
      { href: "/pec-implants-houston", text: "Pec Implants" },
      { href: "/male-facelift-houston", text: "Male Facelift" },
      { href: "/hair-restoration-houston", text: "Hair Transplant" },
      { href: "/liposuction-houston", text: "Liposuction (Ab Etching/Pec Etching)" },
      { href: "#", text: "Male Tummy Tuck" },
      { href: "/houston-nose-jobs", text: "Rhinoplasty" },
    ],
  },
  {
    colClass: "12 col-lg-4",
    imgUrl: "/img/doctor-category-5.png",
    label: "ALL IN ONE SOLUTIONS",
    items: [
      { href: "#", text: "Daddy Do-Over" },
      { href: "/mommy-makeover-houston", text: "Mommy Makeover" },
      { href: "#", text: "Anti-Aging Makeover or Grand-Mommy Makeover" },
      { href: "#", text: "Massive Weight Loss" },
      { href: "#", text: "Glow Up/ Curvy Look" },
    ],
  },
];
