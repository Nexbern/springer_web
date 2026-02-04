import { useState } from 'react';
import { Calendar, ChevronRight, Search, Bell, Sparkles } from 'lucide-react';
import { notices, blogPosts } from '@/data/siteData';
import { AnimatedCard } from '@/components/ui-custom/AnimatedCard';
import { SectionHeader } from '@/components/ui-custom/SectionHeader';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'all', name: 'All', color: 'gray' },
  { id: 'Admission', name: 'Admissions', color: 'red' },
  { id: 'Event', name: 'Events', color: 'green' },
  { id: 'Academic', name: 'Academic', color: 'blue' },
  { id: 'General', name: 'General', color: 'purple' },
];

export function Notices() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotices = notices.filter((notice) => {
    const matchesCategory = activeCategory === 'all' || notice.category === activeCategory;
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notice.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="pt-24">
      {/* Hero Banner with Image and Black Overlay */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/smart_classroom.jpg"
            alt="Notices"
            className="w-full h-full object-cover"
          />
          {/* Black overlay */}
          <div className="absolute inset-0 bg-black/70" />
        </div>
        
        <div className="section-padding relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-springer-red text-white text-sm font-medium rounded-full mb-4">
              Notices & Updates
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Stay <span className="text-springer-red">Informed</span>
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Get the latest updates, announcements, and important information about 
              school activities and events.
            </p>
          </div>
        </div>
      </section>

      {/* Notices Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="section-padding">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                    activeCategory === category.id
                      ? 'bg-springer-red text-white shadow-lg'
                      : 'bg-gray-100 text-springer-charcoal hover:bg-springer-red/10 hover:text-springer-red'
                  )}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search notices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Notices Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredNotices.map((notice, index) => (
              <AnimatedCard key={notice.id} delay={index * 100}>
                <div className="group card-modern p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-12 h-12 rounded-xl flex items-center justify-center',
                        notice.priority === 'high' ? 'bg-red-100' : 'bg-blue-100'
                      )}>
                        <Bell className={cn(
                          'w-6 h-6',
                          notice.priority === 'high' ? 'text-springer-red' : 'text-blue-600'
                        )} />
                      </div>
                      <div>
                        <span className={cn(
                          'inline-block px-2 py-0.5 text-xs font-medium rounded',
                          notice.category === 'Admission' && 'bg-red-100 text-red-600',
                          notice.category === 'Event' && 'bg-green-100 text-green-600',
                          notice.category === 'Academic' && 'bg-blue-100 text-blue-600',
                          notice.category === 'General' && 'bg-purple-100 text-purple-600',
                        )}>
                          {notice.category}
                        </span>
                        {notice.priority === 'high' && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-medium rounded">
                            <Sparkles className="w-3 h-3 mr-1" />
                            NEW
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="flex items-center gap-1 text-sm text-springer-gray">
                      <Calendar className="w-4 h-4" />
                      {new Date(notice.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-springer-charcoal mb-2 group-hover:text-springer-red transition-colors">
                    {notice.title}
                  </h3>

                  <p className="text-springer-gray text-sm leading-relaxed mb-4">
                    {notice.content}
                  </p>

                  <button className="inline-flex items-center gap-1 text-springer-red text-sm font-medium hover:underline">
                    Read More
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </AnimatedCard>
            ))}
          </div>

          {filteredNotices.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-springer-charcoal mb-2">
                No notices found
              </h3>
              <p className="text-springer-gray">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 lg:py-28 bg-springer-gray-light">
        <div className="section-padding">
          <SectionHeader
            subtitle="Blog & Articles"
            title="Latest from Our Blog"
            description="Insights, tips, and stories from the world of education and parenting."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {blogPosts.map((post, index) => (
              <AnimatedCard key={post.id} delay={index * 100}>
                <article className="group card-modern overflow-hidden h-full">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-springer-red/10 text-springer-red text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                      <span className="text-springer-gray text-xs">
                        {new Date(post.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-springer-charcoal mb-2 group-hover:text-springer-red transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-springer-gray text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-springer-gray">{post.author}</span>
                      <button className="inline-flex items-center gap-1 text-springer-red text-sm font-medium hover:underline">
                        Read More
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </article>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
