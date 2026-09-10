'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface Stats {
  total_messages: number;
  unread_messages: number;
  total_services: number;
  active_services: number;
}
interface Message {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

const ARTICLES = [
  {
    id: 1,
    title: 'Future of Sustainable Architecture',
    category: 'INSIGHTS',
    status: 'Published',
    date: 'Oct 12, 2023',
  },
  {
    id: 2,
    title: 'Modernist Revivals in Urban Areas',
    category: 'DESIGN',
    status: 'Draft',
    date: '2 days ago',
  },
  {
    id: 3,
    title: 'shoshos Annual Corporate Report',
    category: 'CORPORATE',
    status: 'Published',
    date: 'Nov 05, 2023',
  },
];
const INBOX_ITEMS = [
  {
    id: 1,
    initials: 'JD',
    name: 'John Doe',
    email: 'j.doe@architects.com',
    time: '2m ago',
    preview:
      'Looking for a partnership on the upcoming Downtown project. Can we...',
    tags: ['PARTNERSHIP', 'URGENT'],
  },
  {
    id: 2,
    initials: 'AS',
    name: 'Alice Smith',
    email: 'alice@visionary.io',
    time: '1h ago',
    preview: 'Requested a quote for the structural analysis...',
    tags: ['QUOTE REQ'],
  },
  {
    id: 3,
    initials: 'MR',
    name: 'Mark Robert',
    email: 'm.robert@gmail.com',
    time: '5h ago',
    preview: 'Interested in the junior consultant position advertised...',
    tags: ['CAREERS'],
  },
];
const TAG_COLORS: Record<string, string> = {
  PARTNERSHIP: '#10B981',
  URGENT: '#EF4444',
  'QUOTE REQ': '#F97316',
  CAREERS: '#6366F1',
};

export default function AdminDashboard() {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [stats, setStats] = useState<Stats | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState<Message | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    client: '',
    description: '',
  });
  const [notification, setNotification] = useState('');

  const token = () =>
    typeof window !== 'undefined'
      ? localStorage.getItem('shoshos_token')
      : null;
  const userEmail = () =>
    typeof window !== 'undefined' ? localStorage.getItem('shoshos_user') : '';
  const hdrs = useCallback(
    () => ({
      Authorization: `Bearer ${token()}`,
      'Content-Type': 'application/json',
    }),
    [],
  );

  const fetchData = useCallback(async () => {
    if (!token()) {
      router.push('/admin');
      return;
    }
    try {
      const [sRes, mRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/stats`, {
          headers: hdrs(),
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/messages`, {
          headers: hdrs(),
        }),
      ]);
      if (sRes.status === 401) {
        router.push('/admin');
        return;
      }
      setStats(await sRes.json());
      setMessages(await mRes.json());
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }, [router, hdrs]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const markRead = async (id: number) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/messages/${id}/read`,
      { method: 'PATCH', headers: hdrs() },
    );
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, is_read: true } : m)),
    );
    if (selectedMsg?.id === id)
      setSelectedMsg((p) => (p ? { ...p, is_read: true } : null));
    if (stats)
      setStats((p) =>
        p
          ? { ...p, unread_messages: Math.max(0, p.unread_messages - 1) }
          : null,
      );
  };
  const deleteMsg = async (id: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/messages/${id}`, {
      method: 'DELETE',
      headers: hdrs(),
    });
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selectedMsg?.id === id) setSelectedMsg(null);
  };
  const logout = () => {
    localStorage.removeItem('shoshos_token');
    localStorage.removeItem('shoshos_user');
    router.push('/admin');
  };

  const navItems = [
    { icon: '📊', label: 'Dashboard' },
    { icon: '📝', label: 'Articles' },
    { icon: '🏗️', label: 'Projects' },
    { icon: '✉️', label: 'Inbox', badge: stats?.unread_messages },
    { icon: '⚙️', label: 'Settings' },
  ];

  if (loading)
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F1F5F9',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            border: '3px solid #E2E8F0',
            borderTopColor: '#B94312',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <p style={{ color: '#64748B', fontSize: '14px' }}>Loading...</p>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );

  return (
    <div className="admin">
      <aside className="sidebar">
        <div className="sidebar__top">
          <div className="user-info">
            <div className="avatar">A</div>
            <div>
              <p className="uname">shoshos Admin</p>
              <p className="urole">CORPORATE PORTAL</p>
            </div>
          </div>
        </div>
        <nav className="snav">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`nitem${activeNav === item.label ? ' active' : ''}`}
              onClick={() => setActiveNav(item.label)}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
              {item.badge ? <span className="nbadge">{item.badge}</span> : null}
            </button>
          ))}
        </nav>
        <div className="sidebar__bottom">
          <div className="user-info">
            <div className="avatar sm">A</div>
            <div>
              <p className="uname">Admin User</p>
              <p className="urole">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="main">
        <header className="topbar">
          <div className="tlogo">
            <img
              src="/logo.png"
              alt="Shoshos Oil and Gas Intl. Limited"
              className="logo-icon"
            />
            <span className="tbrand">
              <strong>shoshos</strong>{' '}
              <span style={{ color: '#B94312' }}>
                Oil and Gas Intl. Limited
              </span>
            </span>
          </div>
          <div className="tsearch">
            <span>🔍</span>
            <input type="search" placeholder="Search data..." />
          </div>
          <div className="tactions">
            <button className="ibtn">🔔</button>
            <button className="ibtn">❓</button>
            <button className="pbtn" onClick={logout}>
              Profile Settings ▾
            </button>
          </div>
        </header>

        <div className="content">
          {activeNav === 'Dashboard' && (
            <div>
              <div className="cheader">
                <div>
                  <h1 className="ctitle">Dashboard Overview</h1>
                  <p className="csub">
                    Real-time performance metrics and quick management tools.
                  </p>
                </div>
                <button
                  className="btnprimary"
                  onClick={() => setActiveNav('Articles')}
                >
                  + Add New Article
                </button>
              </div>
              <div className="srow">
                <div className="sbox">
                  <div>
                    <p className="slabel">TOTAL ARTICLES</p>
                    <p className="sval">{stats?.total_services || 124}</p>
                    <p className="strend">↗ +12% this month</p>
                  </div>
                  <div className="sicon sicon--o">📄</div>
                </div>
                <div className="sbox">
                  <div>
                    <p className="slabel">TOTAL PROJECTS</p>
                    <p className="sval">{stats?.active_services || 48}</p>
                    <p className="strend" style={{ color: '#10B981' }}>
                      ✓ 8 Active now
                    </p>
                  </div>
                  <div className="sicon sicon--b">📋</div>
                </div>
                <div className="sbox">
                  <div>
                    <p className="slabel">NEW NOTIFICATIONS</p>
                    <p className="sval">
                      {String(stats?.unread_messages || 9).padStart(2, '0')}
                    </p>
                    <p className="strend" style={{ color: '#EF4444' }}>
                      ! Needs response
                    </p>
                  </div>
                  <div className="sicon sicon--r">✉️</div>
                </div>
              </div>
              <div className="dgrid">
                <div className="panel">
                  <div className="ph">
                    <h3 className="ptitle">MANAGE BLOG ARTICLES</h3>
                    <span className="live">● LIVE UPDATES</span>
                  </div>
                  <table className="atable">
                    <thead>
                      <tr>
                        <th>ARTICLE TITLE</th>
                        <th>CATEGORY</th>
                        <th>STATUS</th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ARTICLES.map((a) => (
                        <tr key={a.id}>
                          <td>
                            <p className="atitle">{a.title}</p>
                            <p className="adate">
                              {a.status === 'Published'
                                ? `Published ${a.date}`
                                : `Draft saved ${a.date}`}
                            </p>
                          </td>
                          <td>
                            <span className="cpill">{a.category}</span>
                          </td>
                          <td>
                            <span
                              className={`spill spill--${a.status === 'Published' ? 'pub' : 'draft'}`}
                            >
                              ● {a.status}
                            </span>
                          </td>
                          <td>
                            <button className="dicon">🗑</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="ipanel">
                  <div className="ph">
                    <h3 className="ptitle">INBOUND CONTACTS</h3>
                    <span className="ibadge">
                      {stats?.unread_messages || 4}
                    </span>
                  </div>
                  <div>
                    {INBOX_ITEMS.map((item) => (
                      <div key={item.id} className="iitem">
                        <div className="iavatar">{item.initials}</div>
                        <div className="ibody">
                          <div className="imeta">
                            <div>
                              <p className="iname">{item.name}</p>
                              <p className="iemail">{item.email}</p>
                            </div>
                            <span className="itime">{item.time}</span>
                          </div>
                          <p className="ipreview">{item.preview}</p>
                          <div className="itags">
                            {item.tags.map((t) => (
                              <span
                                key={t}
                                className="itag"
                                style={{
                                  background: TAG_COLORS[t] + '20',
                                  color: TAG_COLORS[t],
                                }}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    className="valltbn"
                    onClick={() => setActiveNav('Inbox')}
                  >
                    VIEW ALL NOTIFICATIONS
                  </button>
                  <div className="protip">
                    <p className="ptiptitle">Pro Tip:</p>
                    <p className="ptiptext">
                      Use the Articles dashboard to schedule future posts.
                      Keeping a consistent content cadence improves portal SEO
                      by 40%.
                    </p>
                    <button className="learnbtn">LEARN MORE</button>
                  </div>
                </div>
              </div>
              <div className="panel" style={{ marginTop: '20px' }}>
                <div className="ph">
                  <h3 className="ptitle">ADD NEW PROJECT UPDATE</h3>
                </div>
                <div className="pform">
                  <div className="fr2">
                    <div className="fgroup">
                      <label>PROJECT TITLE</label>
                      <input
                        value={projectForm.title}
                        onChange={(e) =>
                          setProjectForm((p) => ({
                            ...p,
                            title: e.target.value,
                          }))
                        }
                        placeholder="e.g. Skyline Residency Phase II"
                      />
                    </div>
                    <div className="fgroup">
                      <label>CLIENT NAME</label>
                      <input
                        value={projectForm.client}
                        onChange={(e) =>
                          setProjectForm((p) => ({
                            ...p,
                            client: e.target.value,
                          }))
                        }
                        placeholder="e.g. Global Tech Park Ltd"
                      />
                    </div>
                  </div>
                  <div className="fgroup">
                    <label>UPDATE DESCRIPTION</label>
                    <textarea
                      value={projectForm.description}
                      onChange={(e) =>
                        setProjectForm((p) => ({
                          ...p,
                          description: e.target.value,
                        }))
                      }
                      rows={4}
                      placeholder="Detailed project status and milestones..."
                    />
                  </div>
                  <div className="fgroup">
                    <label>PROJECT VISUAL</label>
                    <div className="upzone">
                      <span
                        style={{
                          fontSize: '28px',
                          display: 'block',
                          marginBottom: '6px',
                        }}
                      >
                        ☁
                      </span>
                      <p>Click to upload or drag and drop image (JPG, PNG)</p>
                    </div>
                  </div>
                  <button
                    className="publishbtn"
                    onClick={() => {
                      setNotification('Project published!');
                      setTimeout(() => setNotification(''), 3000);
                    }}
                  >
                    Publish Project Update
                  </button>
                  {notification && (
                    <p
                      style={{
                        color: '#10B981',
                        marginTop: '10px',
                        fontSize: '14px',
                        fontWeight: 600,
                      }}
                    >
                      ✅ {notification}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeNav === 'Inbox' && (
            <div>
              <div className="cheader">
                <div>
                  <h1 className="ctitle">Message Inbox</h1>
                  <p className="csub">
                    All contact submissions from the website.
                  </p>
                </div>
              </div>
              <div className="inboxlayout">
                <div className="inboxlist">
                  {messages.length === 0 && (
                    <p
                      style={{
                        padding: '24px',
                        color: '#94A3B8',
                        fontSize: '14px',
                      }}
                    >
                      No messages yet.
                    </p>
                  )}
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`msgrow${!msg.is_read ? ' unread' : ''}${selectedMsg?.id === msg.id ? ' selected' : ''}`}
                      onClick={() => {
                        setSelectedMsg(msg);
                        if (!msg.is_read) markRead(msg.id);
                      }}
                    >
                      <div className="msgav">{msg.name[0]}</div>
                      <div className="msgb">
                        <div className="msgtop">
                          <span className="msgname">{msg.name}</span>
                          <span className="msgtime">
                            {new Date(msg.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="msgsubj">
                          {msg.subject || 'General Inquiry'}
                        </p>
                        <p className="msgprev">
                          {msg.message.substring(0, 80)}...
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="msgdetail">
                  {selectedMsg ? (
                    <>
                      <div className="mdheader">
                        <div>
                          <h2 className="mdname">{selectedMsg.name}</h2>
                          <a
                            href={`mailto:${selectedMsg.email}`}
                            className="mdemail"
                          >
                            {selectedMsg.email}
                          </a>
                        </div>
                        <button
                          className="delbtn"
                          onClick={() => deleteMsg(selectedMsg.id)}
                        >
                          🗑 Delete
                        </button>
                      </div>
                      <p className="mdsubj">
                        {selectedMsg.subject || 'General Inquiry'}
                      </p>
                      <p className="mddate">
                        {new Date(selectedMsg.created_at).toLocaleString()}
                      </p>
                      <div className="mdbody">{selectedMsg.message}</div>
                      <a
                        href={`mailto:${selectedMsg.email}?subject=Re: ${selectedMsg.subject}`}
                        className="replylink"
                      >
                        ✉️ Reply via Email
                      </a>
                    </>
                  ) : (
                    <div className="emptydetail">Select a message to read</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeNav === 'Articles' && (
            <div>
              <div className="cheader">
                <div>
                  <h1 className="ctitle">Blog Articles</h1>
                  <p className="csub">Manage all website articles.</p>
                </div>
                <button className="btnprimary">+ New Article</button>
              </div>
              <div className="panel">
                <table className="atable" style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <th>ARTICLE TITLE</th>
                      <th>CATEGORY</th>
                      <th>STATUS</th>
                      <th>DATE</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {ARTICLES.map((a) => (
                      <tr key={a.id}>
                        <td>
                          <p className="atitle">{a.title}</p>
                        </td>
                        <td>
                          <span className="cpill">{a.category}</span>
                        </td>
                        <td>
                          <span
                            className={`spill spill--${a.status === 'Published' ? 'pub' : 'draft'}`}
                          >
                            ● {a.status}
                          </span>
                        </td>
                        <td style={{ fontSize: '13px', color: '#94A3B8' }}>
                          {a.date}
                        </td>
                        <td>
                          <button className="dicon">🗑</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeNav === 'Projects' && (
            <div>
              <div className="cheader">
                <div>
                  <h1 className="ctitle">Projects</h1>
                  <p className="csub">Manage portfolio projects.</p>
                </div>
                <button className="btnprimary">+ New Project</button>
              </div>
              <div className="panel">
                <p
                  style={{
                    padding: '32px',
                    color: '#94A3B8',
                    textAlign: 'center',
                    fontSize: '14px',
                  }}
                >
                  Connect to the API to manage projects dynamically.
                </p>
              </div>
            </div>
          )}

          {activeNav === 'Settings' && (
            <div>
              <div className="cheader">
                <div>
                  <h1 className="ctitle">Settings</h1>
                  <p className="csub">Manage account and website settings.</p>
                </div>
              </div>
              <div className="panel" style={{ padding: '32px' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '18px',
                    fontWeight: 800,
                    marginBottom: '20px',
                    color: 'var(--text-heading)',
                  }}
                >
                  Account Information
                </h3>
                <div className="fr2">
                  <div className="fgroup">
                    <label>Email Address</label>
                    <input
                      defaultValue={userEmail() || 'admin@shoshosltd.com'}
                    />
                  </div>
                  <div className="fgroup">
                    <label>Full Name</label>
                    <input defaultValue="Admin User" />
                  </div>
                </div>
                <div className="fgroup">
                  <label>New Password</label>
                  <input type="password" placeholder="••••••••" />
                </div>
                <button className="btnprimary" style={{ marginTop: '8px' }}>
                  Save Changes
                </button>
                <div
                  style={{
                    marginTop: '32px',
                    paddingTop: '32px',
                    borderTop: '1px solid var(--border)',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '18px',
                      fontWeight: 800,
                      marginBottom: '16px',
                      color: '#EF4444',
                    }}
                  >
                    Danger Zone
                  </h3>
                  <button
                    onClick={logout}
                    style={{
                      background: 'none',
                      border: '1.5px solid #EF4444',
                      color: '#EF4444',
                      padding: '10px 24px',
                      borderRadius: '4px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontSize: '14px',
                      transition: 'all 0.2s',
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
