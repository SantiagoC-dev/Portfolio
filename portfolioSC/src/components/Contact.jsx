
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { contact } from '../data/site';
import { Icon } from './UI';

// ======================================================
// VALIDACIÓN Y LIMPIEZA DE ENTRADAS
// ======================================================

function removeControlCharacters(value, preserveLineBreaks = false) {
  return Array.from(value)
    .filter((character) => {
      const code = character.codePointAt(0);

      if (preserveLineBreaks && (code === 9 || code === 10)) {
        return true;
      }

      return (
        code >= 32 &&
        !(code >= 127 && code <= 159) &&
        !(code >= 0xd800 && code <= 0xdfff)
      );
    })
    .join('');
}

function limitLength(value, maxLength) {
  return Array.from(value).slice(0, maxLength).join('');
}

function cleanSingleLine(value, maxLength) {
  const normalized = String(value ?? '')
    .normalize('NFKC')
    .replace(/\s+/g, ' ');

  const cleaned = removeControlCharacters(normalized)
    .replace(/[<>`]/g, '')
    .trim();

  return limitLength(cleaned, maxLength);
}

function cleanMultiline(value, maxLength) {
  const normalized = String(value ?? '')
    .normalize('NFKC')
    .replace(/\r\n?/g, '\n');

  const cleaned = removeControlCharacters(normalized, true)
    .replace(/[<>`]/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return limitLength(cleaned, maxLength);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// ======================================================
// PLANTILLAS DE COMUNICACIÓN ES / EN
// ======================================================

const MESSAGE_TEMPLATES = {
  es: {
    intentions: [
      'el desarrollo de un sitio web o tienda en línea',
      'el desarrollo de un sistema a medida',
      'el desarrollo de una aplicación',
      'una oportunidad laboral',
      'una consulta profesional'
    ],

    subjects: [
      'Consulta sobre desarrollo web',
      'Consulta sobre un sistema a medida',
      'Consulta sobre desarrollo de aplicaciones',
      'Oportunidad laboral',
      'Consulta profesional'
    ],

    projectClosing:
      'Me gustaría conocer tu disponibilidad y conversar sobre la mejor manera de llevar a cabo este proyecto.',

    recruitmentClosing:
      'Me gustaría conocer tu disponibilidad para conversar sobre esta oportunidad y explorar cómo podríamos colaborar.',

    invalidForm:
      'Por favor, verifica que todos los campos estén completos y sean válidos.',

    invalidMessage:
      'Cuéntame un poco más sobre tu solicitud. El mensaje debe tener al menos 10 caracteres.',

    whatsappFeedback:
      'El mensaje está preparado. Revísalo y envíalo desde WhatsApp.',

    emailFeedback:
      'El correo está preparado. Revísalo y envíalo desde tu aplicación de correo.',

    unexpectedError:
      'No fue posible preparar el mensaje. Inténtalo nuevamente o utiliza los enlaces de contacto directo.'
  },

  en: {
    intentions: [
      'the development of a website or online store',
      'the development of a custom software system',
      'the development of an application',
      'a job opportunity',
      'a professional inquiry'
    ],

    subjects: [
      'Website development inquiry',
      'Custom software development inquiry',
      'Application development inquiry',
      'Job opportunity',
      'Professional inquiry'
    ],

    projectClosing:
      'I would like to discuss your availability and explore the best way to bring this project to life.',

    recruitmentClosing:
      'I would like to discuss your availability and explore how we could work together.',

    invalidForm:
      'Please make sure all required fields are complete and valid.',

    invalidMessage:
      'Please provide a few more details. Your message must contain at least 10 characters.',

    whatsappFeedback:
      'Your message is ready. Review and send it through WhatsApp.',

    emailFeedback:
      'Your email is ready. Review and send it through your email application.',

    unexpectedError:
      'Your message could not be prepared. Please try again or use the direct contact links.'
  }
};

// ======================================================
// GENERADOR DE MENSAJES PROFESIONALES
// ======================================================

function buildMessage({
  language,
  method,
  name,
  email,
  typeIndex,
  message
}) {
  const template = MESSAGE_TEMPLATES[language];
  const intention = template.intentions[typeIndex];
  const subject = template.subjects[typeIndex];

  const isProfessionalInquiry = typeIndex === 3 || typeIndex === 4;

  const closing = isProfessionalInquiry
    ? template.recruitmentClosing
    : template.projectClosing;

  // WhatsApp: comunicación breve y conversacional.

  if (method === 'whatsapp') {
    const body =
      language === 'en'
        ? `Hi Santiago! I hope you're doing well.

I'm ${name}. I came across your portfolio and would like to talk to you about ${intention}.

${message}

You can also reach me by email at ${email}.

I'd love to hear your thoughts. Thanks!`
        : `¡Hola, Santiago! Espero que estés muy bien.

Soy ${name}. Estuve revisando tu portafolio y me gustaría conversar contigo sobre ${intention}.

${message}

También puedes contactarme por correo en ${email}.

Quedo pendiente de tu respuesta. ¡Muchas gracias!`;

    return { subject, body };
  }

  // Correo electrónico: comunicación profesional.

  const body =
    language === 'en'
      ? `Hi Santiago,

I hope you're doing well.

My name is ${name}. After reviewing your professional portfolio, I would like to get in touch regarding ${intention}.

I'd like to share a few more details:

${message}

${closing}

You can contact me at ${email}.

Thank you for your time. I look forward to hearing from you.

Best regards,
${name}`
      : `Hola, Santiago:

Espero que te encuentres muy bien.

Mi nombre es ${name}. Después de revisar tu portafolio profesional, me gustaría ponerme en contacto contigo para conversar sobre ${intention}.

Te comparto un poco más sobre mi solicitud:

${message}

${closing}

Puedes contactarme a través de mi correo electrónico: ${email}.

Muchas gracias por tu tiempo. Quedo pendiente de tu respuesta.

Saludos cordiales,
${name}`;

  return { subject, body };
}

// ======================================================
// COMPONENTE DE CONTACTO
// ======================================================

export default function Contact() {
  const { t, i18n } = useTranslation();

  const [status, setStatus] = useState(null);
  const [error, setError] = useState('');

  const language = (
    i18n.resolvedLanguage ||
    i18n.language ||
    'es'
  )
    .toLowerCase()
    .startsWith('en')
    ? 'en'
    : 'es';

  const template = MESSAGE_TEMPLATES[language];

  const translatedTypes = t('contact.types', {
    returnObjects: true
  });

  const contactTypes = Array.isArray(translatedTypes)
    ? translatedTypes
    : [];

  // ====================================================
  // PROCESAMIENTO DEL FORMULARIO
  // ====================================================

  function prepare(e) {
    e.preventDefault();

    setStatus(null);
    setError('');

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: protección básica contra bots.
    if (String(data.get('companyWebsite') ?? '').trim()) {
      return;
    }

    // Limpieza de datos ingresados.

    const name = cleanSingleLine(
      data.get('name'),
      100
    );

    const email = cleanSingleLine(
      data.get('email'),
      150
    );

    const message = cleanMultiline(
      data.get('message'),
      2000
    );

    const rawType = String(
      data.get('type') ?? ''
    );

    const typeIndex = /^\d+$/.test(rawType)
      ? Number(rawType)
      : -1;

    // Validación de los campos obligatorios.

    if (
      name.length < 2 ||
      !isValidEmail(email) ||
      !Number.isInteger(typeIndex) ||
      typeIndex < 0 ||
      typeIndex >= contactTypes.length ||
      typeIndex >= template.intentions.length
    ) {
      setError(template.invalidForm);
      return;
    }

    if (message.length < 10) {
      setError(template.invalidMessage);
      return;
    }

    // Solo se permiten los métodos conocidos.

    const method =
      e.nativeEvent.submitter?.value === 'whatsapp'
        ? 'whatsapp'
        : 'email';

    try {
      const { subject, body } = buildMessage({
        language,
        method,
        name,
        email,
        typeIndex,
        message
      });

      // Preparar mensaje de WhatsApp.

      if (method === 'whatsapp') {
        const phone = String(
          contact.whatsapp ?? ''
        ).trim();

        // Validar el número en formato internacional.
        if (!/^[1-9]\d{7,14}$/.test(phone)) {
          setError(template.unexpectedError);
          return;
        }

        const url =
          `https://wa.me/${phone}?text=${encodeURIComponent(body)}`;

        window.open(
          url,
          '_blank',
          'noopener,noreferrer'
        );

        setStatus('whatsapp');

        return;
      }

      // Preparar correo electrónico.

      const recipient = String(
        contact.email ?? ''
      ).trim();

      if (
        !isValidEmail(recipient) ||
        /[?#&%]/.test(recipient)
      ) {
        setError(template.unexpectedError);
        return;
      }

      const url =
        `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      setStatus('email');

      window.location.href = url;

    } catch {
      setStatus(null);
      setError(template.unexpectedError);
    }
  }

  function resetFeedback() {
    if (status) {
      setStatus(null);
    }

    if (error) {
      setError('');
    }
  }

  // ====================================================
  // INTERFAZ DEL COMPONENTE
  // ====================================================

  return (
    <section
      id="contact"
      className="contact-section section"
    >
      <div className="shell contact-grid">

        {/* INFORMACIÓN DE CONTACTO */}

        <div className="contact-copy" data-reveal>

          <p className="eyebrow">
            {t('contact.eyebrow')}
          </p>

          <h2>
            {t('contact.title')}
          </h2>

          <p>
            {t('contact.intro')}
          </p>

          <p className="direct-label">
            {t('contact.direct')}
          </p>

          <div className="direct-links">

            <a href={`mailto:${contact.email}`}>
              {t('contact.emailLink')}

              <Icon name="external" />
            </a>

            <a
              href={`https://wa.me/${contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp

              <Icon name="external" />
            </a>

            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn

              <Icon name="external" />
            </a>

            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub

              <Icon name="external" />
            </a>

          </div>

          <a
            className="email-address"
            href={`mailto:${contact.email}`}
          >
            {contact.email}
          </a>

        </div>

        {/* FORMULARIO DE CONTACTO */}

        <form
          className="contact-form"
          onSubmit={prepare}
          onChange={resetFeedback}
          data-reveal
        >

          {/* Honeypot antispam */}

          <input
            className="hp-field"
            name="companyWebsite"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          {/* Nombre y correo electrónico */}

          <div className="form-pair">

            <label>
              {t('contact.name')}

              <input
                name="name"
                type="text"
                autoComplete="name"
                required
                minLength={2}
                maxLength={100}
                pattern={'.*\\S.*'}
              />
            </label>

            <label>
              {t('contact.email')}

              <input
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                autoCapitalize="none"
                spellCheck={false}
                required
                maxLength={150}
              />
            </label>

          </div>

          {/* Tipo de solicitud */}

          <label>
            {t('contact.type')}

            <select
              name="type"
              defaultValue=""
              required
            >
              <option value="" disabled>
                {t('contact.placeholder')}
              </option>

              {contactTypes.map((option, i) => (
                <option
                  key={i}
                  value={String(i)}
                >
                  {option}
                </option>
              ))}
            </select>

          </label>

          {/* Descripción de la solicitud */}

          <label>
            {t('contact.message')}

            <textarea
              name="message"
              rows={5}
              required
              minLength={10}
              maxLength={2000}
            />
          </label>

          {/* Acciones de contacto */}

          <div className="form-actions">

            <button
              className="button primary"
              type="submit"
              value="email"
            >
              {t('contact.send')}

              <Icon name="external" />
            </button>

            <button
              className="button secondary"
              type="submit"
              value="whatsapp"
            >
              {t('contact.whatsappSend')}

              <Icon name="external" />
            </button>

          </div>

          {/* Aviso de privacidad */}

          <p className="form-note">
            {t('contact.note')}
          </p>

          {/* Mensaje de error */}

          {error && (
            <p
              role="alert"
              className="form-error"
              style={{
                color: 'var(--ink)',
                fontSize: '0.85rem',
                padding: '12px',
                border: '1px solid #b45353',
                borderRadius: '6px'
              }}
            >
              {error}
            </p>
          )}

          {/* Confirmación del mensaje preparado */}

          {status && (
            <p
              role="status"
              className="form-status"
            >
              <Icon name="check" />

              {status === 'whatsapp'
                ? template.whatsappFeedback
                : template.emailFeedback}
            </p>
          )}

        </form>
      </div>
    </section>
  );
}
