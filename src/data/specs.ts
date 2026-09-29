export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'performance' | 'hardware' | 'workflow';
}

export const FAQS: FAQItem[] = [
  {
    id: 'how-it-works',
    category: 'general',
    question: 'How does PurrfectBackup work?',
    answer:
      'Power the device via USB-C (from any standard 20W+ power bank or the included 27W adapter). Plug your card reader into one USB 3.0 port and your target SSD/HDD into the other. The crisp 1.3" OLED screen and tactile 5-way joystick guide you through a one-button copy process — no phone, no Wi-Fi, and no apps required.',
  },
  {
    id: 'transfer-speed',
    category: 'performance',
    question: 'How fast is the data transfer?',
    answer:
      'Each USB port supports up to 5Gbps (~500MB/s). Real-world sustained speeds typically achieve 100–200MB/s depending on card and media controller speed. For example, backing up 100GB of 4K/8K footage from a fast CFexpress or SD card to an NVMe SSD takes roughly 8 to 10 minutes.',
  },
  {
    id: 'supported-cards',
    category: 'hardware',
    question: 'What memory cards are supported?',
    answer:
      'Any camera media card — including SD, microSD, CFexpress Type A & B, CFast 2.0, and CompactFlash — via a compatible USB card reader. Because PurrfectBackup uses standard USB mass storage protocols, if your reader works on a computer, it works on PurrfectBackup.',
  },
  {
    id: 'file-integrity',
    category: 'performance',
    question: 'Does it ever delete or modify my original camera files?',
    answer:
      'Never. PurrfectBackup mounts your memory card strictly in read-only mode. It will never overwrite, modify, or delete anything on the source card. It also calculates verification checksums to ensure zero bit rot.',
  },
  {
    id: 'backup-modes',
    category: 'workflow',
    question: 'What is the difference between "Dated Copy" and "Just Copy"?',
    answer:
      'Dated Copy automatically reads the creation timestamp of your media and organizes files into clean folders: dated-backup/MM-DD-YYYY/. Just Copy mirrors your memory card’s internal directory structure byte-for-byte into just-backup/. Both modes use smart duplicate detection so only newly added frames are copied.',
  },
  {
    id: 'std-vs-pro',
    category: 'hardware',
    question: 'What is the difference between Standard and PRO models?',
    answer:
      'Both models back up the same cards at the exact same 5Gbps transfer speed. The PRO model adds an internal M.2 NVMe slot (supporting 128GB to 4TB M.2 2280 SSDs), allowing you to carry fast internal storage inside the device with zero tethered drives or loose cables.',
  },
  {
    id: 'battery-power',
    category: 'general',
    question: 'How is it powered in the field?',
    answer:
      'PurrfectBackup runs on standard USB-C Power Delivery (20W+). A typical 10,000mAh external power bank powers the device for approximately 2 to 3 hours of continuous multi-card dumping. It also features an integrated RTC (Real-Time Clock) powered by a replaceable CR2032 cell to guarantee accurate timestamps even off-grid.',
  },
  {
    id: 'webui-optional',
    category: 'workflow',
    question: 'Is the WebUI mandatory?',
    answer:
      'No! PurrfectBackup is 100% autonomous. The WebUI is completely optional for advanced users who want to connect over a local offline Wi-Fi broadcast to inspect file previews, check SHA-256 logs, or download selective shots directly to a smartphone or iPad.',
  },
];

export interface ArticleItem {
  tag: string;
  title: string;
  description: string;
  readTime: string;
  link: string;
}

export const KNOWLEDGE_ARTICLES: ArticleItem[] = [
  {
    tag: 'Backup Modes',
    title: 'Dated copy vs. Just copy in professional workflows',
    description:
      'Understand how Dated Copy sorts shoots by capture date into dated-backup/MM-DD-YYYY, while Just Copy replicates the card structure for complex RAW folders.',
    readTime: '3 min read',
    link: 'https://purrfectbackup.com/pb-kb/backup-modes/',
  },
  {
    tag: 'WebUI Companion',
    title: 'Offline verification, checksums & mobile previewing',
    description:
      'How to connect to the optional 5GHz ad-hoc Wi-Fi network to browse backup history, validate checksums, and preview RAW & video clips from your tablet.',
    readTime: '4 min read',
    link: 'https://purrfectbackup.com/pb-kb/how-to-validate-date/',
  },
  {
    tag: 'Field Troubleshooting',
    title: 'Setting RTC internal clock and global timezones',
    description:
      'Keep your photo timestamps synchronized across world timezones using the 5-way joystick hardware menu: Year → Month → Day → Hour → Minute.',
    readTime: '2 min read',
    link: 'https://purrfectbackup.com/pb-kb/change-time-zone/',
  },
];

export interface TechSpecRow {
  parameter: string;
  standard: string;
  pro: string;
  notes?: string;
}

export const TECH_SPECS: TechSpecRow[] = [
  {
    parameter: 'Processor (CPU)',
    standard: 'Quad-core 64-bit 2.4 GHz',
    pro: 'Quad-core 64-bit 2.4 GHz',
    notes: 'Optimized low-power SoC',
  },
  {
    parameter: 'System Memory (RAM)',
    standard: '2 GB High-Speed LPDDR4',
    pro: '2 GB High-Speed LPDDR4',
    notes: 'Zero bottleneck DMA buffering',
  },
  {
    parameter: 'Display & Interface',
    standard: '1.3″ High-Contrast OLED (128×64)',
    pro: '1.3″ High-Contrast OLED (128×64)',
    notes: 'Bright outdoors & low light',
  },
  {
    parameter: 'Hardware Navigation',
    standard: 'Tactile 5-Way Micro-Joystick',
    pro: 'Tactile 5-Way Micro-Joystick',
    notes: 'Operable with thick winter gloves',
  },
  {
    parameter: 'I/O Data Ports',
    standard: '2 × USB 3.2 Gen 1 (5Gbps per port)',
    pro: '2 × USB 3.2 Gen 1 (5Gbps per port)',
    notes: 'Dedicated 900mA power per port',
  },
  {
    parameter: 'Internal M.2 NVMe Slot',
    standard: '— (Requires external drive)',
    pro: 'M.2 2280 PCIe NVMe (Up to 4TB)',
    notes: 'Tool-less secure sled cover',
  },
  {
    parameter: 'Power Input',
    standard: 'USB-C (PD 20W+ or 27W adapter)',
    pro: 'USB-C (PD 20W+ or 27W adapter)',
    notes: 'Works with phone & camera power banks',
  },
  {
    parameter: 'Wireless Connectivity',
    standard: '5.0 GHz 802.11ac Wi-Fi (Optional WebUI)',
    pro: '5.0 GHz 802.11ac Wi-Fi (Optional WebUI)',
    notes: 'Can be physically toggled off',
  },
  {
    parameter: 'Real-Time Clock (RTC)',
    standard: 'Integrated with CR2032 coin cell',
    pro: 'Integrated with CR2032 coin cell',
    notes: 'Years of accurate offline timestamps',
  },
  {
    parameter: 'Form Factor & Weight',
    standard: '102 × 64 × 28 mm · 145g',
    pro: '102 × 64 × 31 mm · 168g (sans NVMe)',
    notes: 'High-impact ruggedized enclosure',
  },
];
