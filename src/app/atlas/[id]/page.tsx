'use client';
import { use, useEffect } from 'react';
import Link from 'next/link';
import { docs, getDoc } from '@/data/docs';
import { getUser } from '@/data/users';
import { Avatar } from '@/components/ui/Avatar';
import { useInvestigation } from '@/lib/store/investigation';

export default function AtlasPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { markVisited } = useInvestigation();
  const doc = getDoc(id);

  useEffect(() => {
    if (id === 'w-oauth') markVisited('wiki');
  }, [id, markVisited]);

  const categories = [...new Set(docs.map(d => d.category))];

  return (
    <div className="flex h-full overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="h-[52px] bg-[#111720] border-b border-[#1E2D42] flex items-center px-5 shrink-0 border-r border-[#1E2D42] w-[200px]">
          <span className="text-[13px] font-semibold text-[#D4DDE8]">Atlas</span>
        </div>
        <div className="w-[200px] overflow-y-auto p-2 border-r border-[#1E2D42] flex-1">
          {categories.map(cat => (
            <div key={cat}>
              <div className="text-[10px] font-semibold text-[#4E6580] uppercase tracking-widest px-2 mb-1.5 mt-3 first:mt-0">{cat}</div>
              {docs.filter(d => d.category === cat).map(d => (
                <Link key={d.id} href={`/atlas/${d.id}`}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-[12px] mb-0.5 transition-colors ${
                    id === d.id ? 'bg-blue-500/10 text-blue-400' : 'text-[#8899AA] hover:bg-[#1C2535] hover:text-[#D4DDE8]'
                  }`}>
                  📄 {d.title}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {doc ? (
          <div className="max-w-[680px] mx-auto px-8 py-7">
            <h1 className="text-[22px] font-bold text-[#D4DDE8] tracking-tight mb-2 leading-tight">{doc.title}</h1>
            <div className="flex items-center gap-2 text-[11px] text-[#4E6580] mb-6 pb-4 border-b border-[#1E2D42]">
              <Avatar userId={doc.updatedBy} size="sm" />
              <span>Updated by {getUser(doc.updatedBy)?.name}</span>
              <span>·</span>
              <span>{doc.lastUpdated}</span>
              <span className="bg-[#1C2535] border border-[#1E2D42] px-1.5 py-0.5 rounded text-[10px]">{doc.category}</span>
            </div>
            {doc.content.map((block, i) => {
              if (block.type === 'heading') return (
                <h2 key={i} className="text-[15px] font-semibold text-[#D4DDE8] mt-5 mb-2.5 tracking-tight">{block.text}</h2>
              );
              if (block.type === 'paragraph') return (
                <p key={i} className="text-[13px] text-[#8899AA] leading-[1.75] mb-3.5">{block.text}</p>
              );
              if (block.type === 'code') return (
                <pre key={i} className="bg-[#0C1016] border border-[#1E2D42] rounded-md p-4 text-[12px] text-sky-300 leading-[1.7] overflow-x-auto mb-3.5 font-mono">{block.text}</pre>
              );
              if (block.type === 'callout') return (
                <div key={i} className={`flex gap-2.5 rounded-md p-3.5 mb-3.5 border text-[12px] leading-relaxed ${
                  block.variant === 'warning' ? 'bg-amber-500/10 border-amber-500/20 text-amber-300' :
                  block.variant === 'danger'  ? 'bg-red-500/10 border-red-500/20 text-red-300' :
                  'bg-blue-500/10 border-blue-500/20 text-blue-300'
                }`}>
                  <span className="text-[14px] shrink-0 mt-0.5">{block.variant === 'warning' ? '⚠️' : block.variant === 'danger' ? '🚨' : 'ℹ️'}</span>
                  <span>{block.text}</span>
                </div>
              );
              if (block.type === 'list') return (
                <ul key={i} className="mb-3.5 pl-4">
                  {block.items.map((item, j) => (
                    <li key={j} className="text-[13px] text-[#8899AA] leading-[1.75] mb-1 list-disc list-outside">{item}</li>
                  ))}
                </ul>
              );
              return null;
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-[#4E6580]">
            <div className="text-center">
              <div className="text-[28px] mb-2">📄</div>
              <div className="text-[13px] font-medium text-[#8899AA]">Select a page</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
