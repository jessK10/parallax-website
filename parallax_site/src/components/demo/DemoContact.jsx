import React, { useState } from "react";

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function DemoContact(){
  const [data, setData] = useState({ name:"", email:"", message:"", agree:false });
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState({ type:"", msg:"" });
  const [submitting, setSubmitting] = useState(false);

  const errs = {
    name: data.name.trim().length < 2 ? "Please enter at least 2 characters." : "",
    email: !emailOk(data.email) ? "Enter a valid email address." : "",
    message: data.message.trim().length < 10 ? "Message should be at least 10 characters." : "",
    agree: !data.agree ? "Please accept the terms to continue." : "",
  };
  const hasErrors = Object.values(errs).some(Boolean);

  const touch = (f) => setTouched((t) => ({ ...t, [f]: true }));

  const onSubmit = (e) => {
    e.preventDefault();
    setStatus({ type:"", msg:"" });
    setSubmitting(true);
    setTouched({ name:true, email:true, message:true, agree:true });

    // Demo only: never sends anywhere
    setTimeout(() => {
      if (hasErrors) {
        setStatus({ type:"error", msg:"Please fix the highlighted fields." });
      } else {
        setStatus({ type:"ok", msg:"Looks good! (Form does not send — demo only.)" });
      }
      setSubmitting(false);
    }, 500);
  };

  return (
    <section id="demo-contact" className="demo-contact w-full">
      <h3 className="heading" style={{ fontSize: "clamp(1.8rem,6vw,3rem)" }}>
        Contact 
      </h3>

      <form className="demo-form" onSubmit={onSubmit} noValidate>
        <div className="field--2col">
          <div className="field">
            <label className="req" htmlFor="demo-name">Name</label>
            <input
              id="demo-name"
              type="text"
              placeholder="Your name"
              value={data.name}
              onChange={(e)=>setData({...data, name:e.target.value})}
              onBlur={()=>touch("name")}
              className={touched.name && errs.name ? "is-invalid" : touched.name ? "is-valid" : ""}
            />
            {touched.name && errs.name ? <div className="hint">{errs.name}</div> : null}
          </div>

          <div className="field">
            <label className="req" htmlFor="demo-email">Email</label>
            <input
              id="demo-email"
              type="email"
              placeholder="you@example.com"
              value={data.email}
              onChange={(e)=>setData({...data, email:e.target.value})}
              onBlur={()=>touch("email")}
              className={touched.email && errs.email ? "is-invalid" : touched.email ? "is-valid" : ""}
            />
            {touched.email && errs.email ? <div className="hint">{errs.email}</div> : null}
          </div>
        </div>

        <div className="field">
          <label className="req" htmlFor="demo-message">Message</label>
          <textarea
            id="demo-message"
            placeholder="Tell us a bit more…"
            value={data.message}
            onChange={(e)=>setData({...data, message:e.target.value})}
            onBlur={()=>touch("message")}
            className={touched.message && errs.message ? "is-invalid" : touched.message ? "is-valid" : ""}
          />
          {touched.message && errs.message ? <div className="hint">{errs.message}</div> : null}
        </div>

        <div className="field field--inline">
          <input
            id="demo-agree"
            type="checkbox"
            checked={data.agree}
            onChange={(e)=>setData({...data, agree:e.target.checked})}
            onBlur={()=>touch("agree")}
            aria-describedby="demo-agree-hint"
          />
          <label htmlFor="demo-agree" className="req" style={{ margin: 0 }}>
            I accept the  terms (no data will be sent).
          </label>
        </div>
        {touched.agree && errs.agree ? <div id="demo-agree-hint" className="hint">{errs.agree}</div> : null}

        <div className={`status ${status.type}`}>{status.msg}</div>

        <div className="demo-actions">
          <button className="btn radius" type="submit" disabled={submitting}>
            {submitting ? "Checking…" : "Submit"}
          </button>
          <button
            type="button"
            className="btn radius"
            onClick={()=>{
              setData({ name:"", email:"", message:"", agree:false });
              setTouched({});
              setStatus({ type:"", msg:"" });
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </section>
  );
}
