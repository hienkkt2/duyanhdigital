/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Facebook, 
  Search, 
  Settings, 
  Users, 
  Link as LinkIcon, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  Phone, 
  Mail, 
  MapPin,
  Star,
  Zap,
  ShieldCheck,
  BarChart3,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types & Constants ---

const ZALO_LINK = "https://zalo.me/0943304685";
const PHONE_NUMBER = "0943 304 685";
const ADDRESS = "Nam Giang, Nam Trực, Nam Định";

interface Service {
  id: string;
  title: string;
  price: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

const SERVICES: Service[] = [
  {
    id: 'web-sales',
    title: 'Thiết kế Website Bán Hàng',
    price: '3.500.000đ',
    description: 'Giao diện tối ưu chuyển đổi, tích hợp thanh toán và quản lý đơn hàng dễ dàng.',
    icon: <Globe className="w-6 h-6" />,
    features: ['Chuẩn SEO', 'Tương thích di động', 'Tốc độ tải nhanh', 'Bảo hành 12 tháng']
  },
  {
    id: 'web-corp',
    title: 'Thiết kế Website Công Ty',
    price: '5.000.000đ',
    description: 'Nâng tầm thương hiệu với website chuyên nghiệp, đẳng cấp và đầy đủ tính năng.',
    icon: <ShieldCheck className="w-6 h-6" />,
    features: ['Thiết kế độc quyền', 'Bảo mật cao', 'Tích hợp CRM', 'Hỗ trợ 24/7']
  },
  {
    id: 'fb-ads',
    title: 'Quảng Cáo Facebook',
    price: 'Từ 50k/ngày',
    description: 'Tiếp cận đúng khách hàng mục tiêu, tối ưu chi phí và bùng nổ đơn hàng.',
    icon: <Facebook className="w-6 h-6" />,
    features: ['Target chuẩn xác', 'Content thu hút', 'Báo cáo hàng tuần', 'Tối ưu liên tục']
  },
  {
    id: 'web-admin',
    title: 'Quản Trị Website',
    price: '3.500.000đ/tháng',
    description: 'Chăm sóc website toàn diện: cập nhật nội dung, tối ưu kỹ thuật và bảo mật.',
    icon: <Settings className="w-6 h-6" />,
    features: ['Cập nhật bài viết', 'Backup dữ liệu', 'Tối ưu tốc độ', 'Fix lỗi kỹ thuật']
  },
  {
    id: 'fanpage-admin',
    title: 'Quản Lý Fanpage',
    price: '3.000.000đ/tháng',
    description: 'Xây dựng cộng đồng khách hàng trung thành trên mạng xã hội.',
    icon: <Users className="w-6 h-6" />,
    features: ['Lên kế hoạch nội dung', 'Thiết kế hình ảnh', 'Tương tác khách hàng', 'Tăng follow thật']
  },
  {
    id: 'seo',
    title: 'SEO Website',
    price: '5.000.000đ/tháng',
    description: 'Đưa website lên Top Google bền vững, thu hút traffic tự nhiên chất lượng.',
    icon: <Search className="w-6 h-6" />,
    features: ['Nghiên cứu từ khóa', 'SEO On-page', 'SEO Off-page', 'Cam kết thứ hạng']
  },
  {
    id: 'entity',
    title: 'Entity & Social Link',
    price: '3.000.000đ',
    description: 'Xác thực thực thể thương hiệu trên Internet, tăng uy tín với Google.',
    icon: <LinkIcon className="w-6 h-6" />,
    features: ['300+ Social Profiles', 'Đồng nhất NAP', 'Tăng Trust website', 'Index nhanh']
  }
];

const PROCESS_STEPS = [
  { title: 'Tư Vấn & Khảo Sát', desc: 'Lắng nghe nhu cầu và phân tích thị trường của khách hàng.' },
  { title: 'Lập Kế Hoạch', desc: 'Đề xuất giải pháp tối ưu và báo giá chi tiết.' },
  { title: 'Triển Khai', desc: 'Đội ngũ chuyên gia thực hiện dự án theo đúng tiến độ.' },
  { title: 'Báo Cáo & Tối Ưu', desc: 'Theo dõi chỉ số và điều chỉnh để đạt hiệu quả cao nhất.' }
];

const CASE_STUDIES = [
  {
    title: 'Bùng Nổ Đơn Hàng Cho Shop Thời Trang',
    client: 'Shop Thời Trang Nữ (Hà Nội)',
    result: '+200% Doanh số',
    desc: 'Tối ưu hóa chiến dịch Facebook Ads và xây dựng nội dung Fanpage thu hút, giúp shop đạt mốc 100 đơn/ngày.',
    image: 'https://picsum.photos/seed/fashion/600/400'
  },
  {
    title: 'Top 5 Google Ngành Xây Dựng',
    client: 'Công Ty Xây Dựng HomeBuild',
    result: 'Top 5 Google',
    desc: 'Triển khai chiến lược SEO tổng thể, đưa hơn 50 từ khóa ngành lên trang nhất Google chỉ sau 4 tháng.',
    image: 'https://picsum.photos/seed/construction/600/400'
  },
  {
    title: 'Nâng Tầm Thương Hiệu Spa & Clinic',
    client: 'Hệ Thống Spa BeautyPlus',
    result: '+40% Khách quay lại',
    desc: 'Thiết kế website đẳng cấp và quản trị nội dung chuyên sâu, giúp khách hàng tin tưởng và gắn bó lâu dài.',
    image: 'https://picsum.photos/seed/spa/600/400'
  }
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Trang chủ', href: '#' },
    { name: 'Dịch vụ', href: '#services' },
    { name: 'Case Study', href: '#cases' },
    { name: 'Quy trình', href: '#process' },
    { name: 'Liên hệ', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">D</div>
          <span className={`font-bold text-xl tracking-tight ${isScrolled ? 'text-slate-900' : 'text-slate-900'}`}>Duy Anh Digital</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
              {link.name}
            </a>
          ))}
          <a 
            href={ZALO_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg"
          >
            Nhận Tư Vấn
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-slate-100 p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-lg font-medium text-slate-700"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href={ZALO_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-600 text-white py-3 rounded-xl font-semibold text-center"
            >
              Nhận Tư Vấn Miễn Phí
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-indigo-50/50 rounded-bl-[100px]" />
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-6">
            <Zap className="w-3 h-3" /> Digital Marketing Agency
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-[1.1] mb-6">
            Bứt Phá Doanh Số Cùng <span className="text-indigo-600">Duy Anh Digital</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
            Chúng tôi giúp các chủ shop và doanh nghiệp nhỏ xây dựng sự hiện diện trực tuyến chuyên nghiệp, tối ưu chuyển đổi và gia tăng lợi nhuận bền vững.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href={ZALO_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 group"
            >
              Bắt Đầu Ngay <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#cases"
              className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              Xem Case Study
            </a>
          </div>
          
          <div className="mt-12 flex items-center gap-8">
            <div>
              <div className="text-2xl font-bold text-slate-900">200+</div>
              <div className="text-sm text-slate-500">Khách hàng</div>
            </div>
            <div className="w-px h-10 bg-slate-200" />
            <div>
              <div className="text-2xl font-bold text-slate-900">5+</div>
              <div className="text-sm text-slate-500">Năm kinh nghiệm</div>
            </div>
            <div className="w-px h-10 bg-slate-200" />
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <div className="text-2xl font-bold text-slate-900">4.9/5</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://picsum.photos/seed/marketing/800/600" 
              alt="Digital Marketing Agency" 
              className="w-full h-auto"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
          
          <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 bg-white p-4 rounded-2xl shadow-lg border border-slate-100 hidden lg:block">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                <BarChart3 className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-slate-800">+150% Traffic</span>
            </div>
            <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                transition={{ duration: 1, delay: 1 }}
                className="h-full bg-emerald-500"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-3">Dịch Vụ Của Chúng Tôi</h2>
          <h3 className="text-4xl font-bold text-slate-900 mb-6">Giải Pháp Marketing Toàn Diện Cho Doanh Nghiệp</h3>
          <p className="text-slate-600">Chúng tôi cung cấp các gói dịch vụ được thiết kế riêng để tối ưu hóa chi phí và mang lại hiệu quả thực tế cho người kinh doanh online.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group"
            >
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                {service.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h4>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">{service.description}</p>
              <div className="space-y-3 mb-8">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    {feature}
                  </div>
                ))}
              </div>
              <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block uppercase font-bold">Giá chỉ từ</span>
                  <span className="text-lg font-bold text-indigo-600">{service.price}</span>
                </div>
                <a 
                  href={ZALO_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-slate-50 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all"
                >
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CaseStudies = () => {
  return (
    <section id="cases" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-3">Case Study Thành Công</h2>
          <h3 className="text-4xl font-bold text-slate-900 mb-4">Dự Án Thực Chiến - Kết Quả Thực Tế</h3>
          <p className="text-slate-600">Chúng tôi không chỉ nói, chúng tôi chứng minh bằng những con số tăng trưởng cụ thể.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {CASE_STUDIES.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {item.result}
                </div>
              </div>
              <div className="p-8">
                <div className="text-xs text-indigo-600 font-bold uppercase mb-2">{item.client}</div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h4>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">{item.desc}</p>
                <a 
                  href={ZALO_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-indigo-600 font-bold text-sm hover:gap-3 transition-all"
                >
                  Xem chi tiết dự án <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  return (
    <section id="process" className="py-24 bg-indigo-600 text-white overflow-hidden relative">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 border border-white rounded-full" />
        <div className="absolute bottom-10 right-10 w-96 h-96 border border-white rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold text-indigo-200 uppercase tracking-widest mb-3">Quy Trình Làm Việc</h2>
          <h3 className="text-4xl font-bold mb-6">Cách Chúng Tôi Mang Lại Thành Công</h3>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {PROCESS_STEPS.map((step, index) => (
            <div key={step.title} className="relative">
              <div className="text-8xl font-black text-white/10 absolute -top-10 -left-4">{index + 1}</div>
              <div className="relative z-10">
                <h4 className="text-xl font-bold mb-4">{step.title}</h4>
                <p className="text-indigo-100 text-sm leading-relaxed">{step.desc}</p>
              </div>
              {index < 3 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ChevronRight className="w-8 h-8 text-white/20" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-3">Khách Hàng Nói Gì</h2>
            <h3 className="text-4xl font-bold text-slate-900">Hơn 200+ Doanh Nghiệp Đã Tin Tưởng Duy Anh Digital</h3>
          </div>
          <div className="flex gap-2">
            <button className="p-3 rounded-full border border-slate-200 hover:bg-white transition-all"><ChevronRight className="w-6 h-6 rotate-180" /></button>
            <button className="p-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"><ChevronRight className="w-6 h-6" /></button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: 'Chị Lan Anh', role: 'Chủ shop thời trang', text: 'Website Duy Anh thiết kế rất đẹp, khách vào khen suốt. Doanh thu tăng hẳn 30% sau khi chạy ads Facebook.' },
            { name: 'Anh Minh Đức', role: 'CEO Nội thất HomeDecor', text: 'Dịch vụ SEO cực kỳ uy tín. Sau 4 tháng, các từ khóa chính của bên mình đều đã lên Top 3 Google.' },
            { name: 'Chị Thu Hà', role: 'Kinh doanh mỹ phẩm Online', text: 'Gói quản lý Fanpage giúp mình rảnh tay hơn nhiều. Nội dung bài viết rất sáng tạo và thu hút khách.' }
          ].map((t, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="text-slate-600 italic mb-8">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-slate-900">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-slate-900 rounded-[40px] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-12 lg:p-20 text-white">
            <h2 className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-6">Liên Hệ Ngay</h2>
            <h3 className="text-4xl font-bold mb-8">Sẵn Sàng Bứt Phá Cùng Chúng Tôi?</h3>
            <p className="text-slate-400 mb-12 leading-relaxed">Để lại thông tin, đội ngũ chuyên gia của Duy Anh Digital sẽ liên hệ tư vấn giải pháp tối ưu nhất cho bạn trong vòng 24h.</p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-indigo-400">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase">Hotline</div>
                  <div className="text-lg font-bold">{PHONE_NUMBER}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-indigo-400">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase">Email</div>
                  <div className="text-lg font-bold">contact.duyanhdigital@gmail.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-indigo-400">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase">Địa chỉ</div>
                  <div className="text-lg font-bold">{ADDRESS}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 bg-white p-12 lg:p-20">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Họ và Tên</label>
                  <input type="text" placeholder="Nguyễn Văn A" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Số điện thoại</label>
                  <input type="tel" placeholder="090 123 4567" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Dịch vụ quan tâm</label>
                <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition-all appearance-none bg-white">
                  <option>Thiết kế Website</option>
                  <option>Quảng cáo Facebook</option>
                  <option>SEO Website</option>
                  <option>Quản trị Fanpage/Web</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Lời nhắn</label>
                <textarea rows={4} placeholder="Tôi muốn tư vấn về..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition-all resize-none"></textarea>
              </div>
              <a 
                href={ZALO_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 text-center"
              >
                Gửi Yêu Cầu Tư Vấn
              </a>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">D</div>
              <span className="font-bold text-xl tracking-tight text-slate-900">Duy Anh Digital</span>
            </div>
            <p className="text-slate-500 max-w-sm mb-8 leading-relaxed">
              Agency Digital Marketing thực chiến, đồng hành cùng doanh nghiệp nhỏ và người kinh doanh online bứt phá doanh thu.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all"><Globe className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all"><MessageSquare className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h5 className="font-bold text-slate-900 mb-6">Dịch Vụ</h5>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Thiết kế Website</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Quảng cáo Facebook</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">SEO Tổng thể</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Quản trị Fanpage</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-slate-900 mb-6">Công Ty</h5>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Giới thiệu</a></li>
              <li><a href="#cases" className="hover:text-indigo-600 transition-colors">Case Study</a></li>
              <li><a href="#process" className="hover:text-indigo-600 transition-colors">Quy trình</a></li>
              <li><a href="#contact" className="hover:text-indigo-600 transition-colors">Liên hệ</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">© 2024 Duy Anh Digital. All rights reserved.</p>
          <div className="flex gap-8 text-sm text-slate-400">
            <a href="#" className="hover:text-slate-600">Chính sách bảo mật</a>
            <a href="#" className="hover:text-slate-600">Điều khoản dịch vụ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <CaseStudies />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      
      {/* Floating CTA for Mobile */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <a 
          href={ZALO_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center animate-bounce"
        >
          <MessageSquare className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
}
