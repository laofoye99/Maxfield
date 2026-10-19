import type { Metadata } from 'next';
import { ResumeView } from '@/components/resume/ResumeView';
export const metadata:Metadata={title:'葛雨欣 / Yuxin Ge · Resume',description:'AIGC 与计算机视觉工程师。工作经历、精选项目、教育背景与 AWS 认证。',alternates:{canonical:'https://maxge.dev/resume/'}};
export default function ResumePage(){return <ResumeView/>;}
