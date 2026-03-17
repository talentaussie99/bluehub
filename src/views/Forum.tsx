import React from 'react';
import { motion } from 'motion/react';
import { 
  MessageSquare, 
  ShoppingBag, 
  Image as ImageIcon, 
  XCircle, 
  BarChart2, 
  Send 
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { ForumPost } from '../types';

export const Forum: React.FC = () => {
  const { 
    userRole, 
    forumTab, 
    setForumTab, 
    newPost, 
    setNewPost, 
    postAttachment, 
    setPostAttachment, 
    showPollForm, 
    setShowPollForm, 
    pollForm, 
    setPollForm, 
    forumPosts, 
    setForumPosts,
    replyingToPostId,
    setReplyingToPostId,
    replyContent,
    setReplyContent,
    handleSubmitForum,
    handleSubmitReply,
    handleVote,
    currentUser
  } = useAppContext();

  return (
    <motion.div 
      key="forum" 
      initial={{ opacity: 0, x: 10 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -10 }} 
      className="w-full space-y-4"
    >
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-100">
          <button 
            onClick={() => setForumTab('Umum')}
            className={`flex-1 py-3 font-bold text-base transition-all flex items-center justify-center gap-2 ${forumTab === 'Umum' ? 'text-blue-900 border-b-2 border-blue-900 bg-slate-50/50' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <MessageSquare size={18} /> Umum
          </button>
          <button 
            onClick={() => setForumTab('Jual-Beli')}
            className={`flex-1 py-3 font-bold text-base transition-all flex items-center justify-center gap-2 ${forumTab === 'Jual-Beli' ? 'text-blue-900 border-b-2 border-blue-900 bg-slate-50/50' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <ShoppingBag size={18} /> Jual-Beli
          </button>
        </div>

        <div className="p-3 bg-slate-50 border-b border-slate-100">
          <div className="flex gap-2.5">
            <div className="w-10 h-10 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 uppercase text-sm">
              {userRole === 'admin' ? 'A' : 'W'}
            </div>
            <div className="flex-1">
              <textarea 
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder={forumTab === 'Umum' ? "Apa yang ingin Anda sampaikan di Paguyuban?" : "Apa yang ingin Anda jual?"}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none h-16 resize-none shadow-inner mb-2"
              ></textarea>
              
              {/* Poll Form */}
              {showPollForm && forumTab === 'Umum' && (
                <div className="bg-white p-3 rounded-xl border border-slate-200 mb-2 space-y-2">
                  <input type="text" placeholder="Pertanyaan Polling" value={pollForm.question} onChange={e => setPollForm({...pollForm, question: e.target.value})} className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
                  <div className="flex gap-2">
                    <input type="text" placeholder="Opsi 1" value={pollForm.opt1} onChange={e => setPollForm({...pollForm, opt1: e.target.value})} className="flex-1 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
                    <input type="text" placeholder="Opsi 2" value={pollForm.opt2} onChange={e => setPollForm({...pollForm, opt2: e.target.value})} className="flex-1 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center">
                <div className="flex gap-1.5">
                  <label className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors flex items-center gap-1 text-xs font-bold">
                    <ImageIcon size={16} /> {postAttachment ? 'Foto Terlampir' : 'Lampirkan Foto'}
                    <input type="file" className="hidden" accept="image/*" onChange={e => {
                      if(e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setPostAttachment({ name: file.name, url: reader.result as string });
                        };
                        reader.readAsDataURL(file);
                      }
                    }} />
                  </label>
                  {postAttachment && (
                    <button onClick={() => setPostAttachment(null)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <XCircle size={14} />
                    </button>
                  )}
                  {forumTab === 'Umum' && (
                    <button onClick={() => setShowPollForm(!showPollForm)} className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold ${showPollForm ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'}`}>
                      <BarChart2 size={16} /> Polling
                    </button>
                  )}
                </div>
                <button 
                  onClick={handleSubmitForum}
                  className="bg-blue-900 text-white px-3 py-1.5 rounded-lg hover:bg-blue-800 transition-all shadow-md flex items-center gap-1.5 text-xs font-bold"
                >
                  <Send size={14} /> Kirim
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {forumPosts.filter(p => p.type === forumTab).map(post => (
            <div key={post.id} className="p-4 hover:bg-slate-50/50 transition-all">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500 flex-shrink-0 text-xs">
                  {post.author[0]}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1.5">
                    <div>
                      <h4 className="font-bold text-slate-800 text-base">{post.author}</h4>
                      <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">{post.timestamp}</p>
                    </div>
                    {post.price && (
                      <span className="bg-emerald-100 text-emerald-600 px-2.5 py-0.5 rounded-full text-xs font-bold">
                        {post.price}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap mb-2">{post.content}</p>
                  
                  {post.attachment && (
                    <div className="mb-2">
                      <img src={post.attachment} alt="Attachment" className="max-w-full h-auto rounded-xl border border-slate-200 max-h-48 object-cover" />
                    </div>
                  )}

                  {post.poll && (
                    <div className="bg-white border border-slate-200 rounded-xl p-3 mb-2 shadow-sm">
                      <h5 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-1.5"><BarChart2 size={16} className="text-blue-500"/> {post.poll.question}</h5>
                      <div className="space-y-1.5">
                        {post.poll.options.map(opt => {
                          const totalVotes = post.poll!.options.reduce((sum, o) => sum + o.votes, 0);
                          const percent = totalVotes === 0 ? 0 : Math.round((opt.votes / totalVotes) * 100);
                          const hasVoted = post.poll!.votedBy.includes(currentUser?.id || '');
                          return (
                            <div key={opt.id} className="relative">
                              <button 
                                onClick={() => handleVote(post.id, opt.id)}
                                disabled={hasVoted}
                                className={`w-full text-left px-3 py-2 rounded-lg border text-sm font-medium relative z-10 transition-colors ${hasVoted ? 'border-slate-200 text-slate-700 cursor-default' : 'border-blue-200 hover:bg-blue-50 text-blue-800'}`}
                              >
                                <div className="flex justify-between relative z-10">
                                  <span>{opt.text}</span>
                                  {hasVoted && <span className="text-slate-500">{percent}% ({opt.votes})</span>}
                                </div>
                              </button>
                              {hasVoted && (
                                <div className="absolute top-0 left-0 h-full bg-blue-100 rounded-lg z-0 transition-all duration-500" style={{width: `${percent}%`}}></div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1.5 text-right">{post.poll.votedBy.length} suara masuk</p>
                    </div>
                  )}

                  <div className="mt-2 flex gap-3">
                    <button 
                      onClick={() => setReplyingToPostId(replyingToPostId === post.id ? null : post.id)}
                      className={`text-[11px] font-bold flex items-center gap-1.5 transition-colors ${replyingToPostId === post.id ? 'text-blue-600' : 'text-slate-400 hover:text-blue-600'}`}
                    >
                      <MessageSquare size={14} /> {post.replies?.length || 0} Balasan
                    </button>
                  </div>

                  {/* Replies Section */}
                  {((post.replies && post.replies.length > 0) || replyingToPostId === post.id) && (
                    <div className="mt-3 pl-3 border-l-2 border-slate-100 space-y-2">
                      {post.replies?.map(reply => (
                        <div key={reply.id} className="bg-slate-50 p-2.5 rounded-xl">
                          <div className="flex justify-between items-start mb-1">
                            <h5 className="font-bold text-xs text-slate-800">{reply.author}</h5>
                            <span className="text-[9px] text-slate-400 uppercase tracking-wider">{reply.timestamp}</span>
                          </div>
                          <p className="text-xs text-slate-600">{reply.content}</p>
                        </div>
                      ))}
                      
                      {replyingToPostId === post.id && (
                        <div className="flex gap-2 mt-1.5">
                          <input 
                            type="text" 
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="Tulis balasan..." 
                            className="flex-1 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleSubmitReply(post.id);
                              }
                            }}
                          />
                          <button 
                            onClick={() => handleSubmitReply(post.id)}
                            className="bg-blue-900 text-white px-2.5 py-1.5 rounded-lg hover:bg-blue-800 transition-all"
                          >
                            <Send size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
