export interface ResumeItem {
  titleEn:  string;
  titleZh:  string;
  period:   string;
  detailEn: string;
  detailZh: string;
}

export const experience: ResumeItem[] = [
  {
    titleEn:  "Your Role · Company Name",
    titleZh:  "职位名称 · 公司名称",
    period:   "2024 – Present",
    detailEn: "Brief description of your responsibilities and achievements.",
    detailZh: "职责与成就的简短描述。",
  },
];

export const education: ResumeItem[] = [
  {
    titleEn:  "Degree · University Name",
    titleZh:  "学位 · 大学名称",
    period:   "2020 – 2024",
    detailEn: "Major and research focus.",
    detailZh: "专业及研究方向。",
  },
];

export const skills: string[] = [
  "Python", "C++", "ROS2", "React", "TypeScript",
  "Three.js", "PyTorch", "OpenCV", "Linux", "Docker",
];