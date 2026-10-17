'use client';

/**
 * Mindful Voice & Text-to-Speech Engine
 * Provides native multilingual voices with localized speaker profiles
 * and on-the-fly authentic language translation.
 */

// ─── Supported Languages ───
export const TTS_LANGUAGES = [
  { id: 'en', label: 'English', flag: '🇺🇸', code: 'en-US' },
  { id: 'es', label: 'Spanish', flag: '🇪🇸', code: 'es-ES' },
  { id: 'fr', label: 'French', flag: '🇫🇷', code: 'fr-FR' },
  { id: 'de', label: 'German', flag: '🇩🇪', code: 'de-DE' },
  { id: 'it', label: 'Italian', flag: '🇮🇹', code: 'it-IT' },
  { id: 'pt', label: 'Portuguese', flag: '🇧🇷', code: 'pt-BR' },
  { id: 'hi', label: 'Hindi', flag: '🇮🇳', code: 'hi-IN' },
  { id: 'ja', label: 'Japanese', flag: '🇯🇵', code: 'ja-JP' },
  { id: 'ko', label: 'Korean', flag: '🇰🇷', code: 'ko-KR' },
  { id: 'zh', label: 'Chinese', flag: '🇨🇳', code: 'zh-CN' },
  { id: 'ar', label: 'Arabic', flag: '🇸🇦', code: 'ar-SA' },
  { id: 'pl', label: 'Polish', flag: '🇵🇱', code: 'pl-PL' },
];

// ─── Native Voices by Language ───
// Each language has its own authentic native speakers with realistic personalities
export const LANGUAGE_VOICES = {
  en: [
    { id: 'en-aria', neuralVoice: 'en-US-AriaNeural', elevenVoiceId: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel', style: 'Calm & Mindful', gender: 'Female' },
    { id: 'en-jenny', neuralVoice: 'en-US-JennyNeural', elevenVoiceId: 'EXAVITQu4vr4xnSDxMaL', name: 'Bella', style: 'Soft & Gentle', gender: 'Female' },
    { id: 'en-guy', neuralVoice: 'en-US-GuyNeural', elevenVoiceId: 'ErXwobaYiN019PkySvjV', name: 'Antoni', style: 'Warm & Grounding', gender: 'Male' },
    { id: 'en-chris', neuralVoice: 'en-US-ChristopherNeural', elevenVoiceId: 'onwK4e9ZLuTAKqWW03F9', name: 'Daniel', style: 'Steady & Deep', gender: 'Male' },
    { id: 'en-ava', neuralVoice: 'en-US-AvaNeural', elevenVoiceId: 'MF3mGyEYCl7XYWbV9V6O', name: 'Elli', style: 'Friendly & Uplifting', gender: 'Female' },
    { id: 'en-michelle', neuralVoice: 'en-US-MichelleNeural', elevenVoiceId: 'AZnzlk1XvdvUeBnXmlld', name: 'Domi', style: 'Vibrant & Clear', gender: 'Female' },
  ],
  es: [
    { id: 'es-elvira', neuralVoice: 'es-ES-ElviraNeural', elevenVoiceId: '21m00Tcm4TlvDq8ikWAM', name: 'Elvira', style: 'Cálida y Serena', gender: 'Female' },
    { id: 'es-dalia', neuralVoice: 'es-MX-DaliaNeural', elevenVoiceId: 'EXAVITQu4vr4xnSDxMaL', name: 'Dalia', style: 'Suave y Relajante', gender: 'Female' },
    { id: 'es-alvaro', neuralVoice: 'es-ES-AlvaroNeural', elevenVoiceId: 'ErXwobaYiN019PkySvjV', name: 'Álvaro', style: 'Cálido y Amable', gender: 'Male' },
    { id: 'es-jorge', neuralVoice: 'es-MX-JorgeNeural', elevenVoiceId: 'onwK4e9ZLuTAKqWW03F9', name: 'Jorge', style: 'Tranquilo y Profundo', gender: 'Male' },
    { id: 'es-abril', neuralVoice: 'es-ES-AbrilNeural', elevenVoiceId: 'MF3mGyEYCl7XYWbV9V6O', name: 'Abril', style: 'Alegre y Positiva', gender: 'Female' },
    { id: 'es-mateo', neuralVoice: 'es-ES-AlvaroNeural', elevenVoiceId: 'AZnzlk1XvdvUeBnXmlld', name: 'Mateo', style: 'Claro y Enérgico', gender: 'Male' },
  ],
  fr: [
    { id: 'fr-denise', neuralVoice: 'fr-FR-DeniseNeural', elevenVoiceId: '21m00Tcm4TlvDq8ikWAM', name: 'Denise', style: 'Douce et Apaisante', gender: 'Female' },
    { id: 'fr-vivienne', neuralVoice: 'fr-FR-VivienneMultilingualNeural', elevenVoiceId: 'EXAVITQu4vr4xnSDxMaL', name: 'Vivienne', style: 'Mélodieuse et Calme', gender: 'Female' },
    { id: 'fr-henri', neuralVoice: 'fr-FR-HenriNeural', elevenVoiceId: 'ErXwobaYiN019PkySvjV', name: 'Henri', style: 'Chaleureux et Posé', gender: 'Male' },
    { id: 'fr-remy', neuralVoice: 'fr-FR-RemyMultilingualNeural', elevenVoiceId: 'onwK4e9ZLuTAKqWW03F9', name: 'Rémy', style: 'Profond et Rassurant', gender: 'Male' },
    { id: 'fr-eloise', neuralVoice: 'fr-FR-EloiseNeural', elevenVoiceId: 'MF3mGyEYCl7XYWbV9V6O', name: 'Éloïse', style: 'Lumineuse et Rayonnante', gender: 'Female' },
    { id: 'fr-jean', neuralVoice: 'fr-FR-HenriNeural', elevenVoiceId: 'AZnzlk1XvdvUeBnXmlld', name: 'Jean', style: 'Clair et Présent', gender: 'Male' },
  ],
  de: [
    { id: 'de-katja', neuralVoice: 'de-DE-KatjaNeural', elevenVoiceId: '21m00Tcm4TlvDq8ikWAM', name: 'Katja', style: 'Ruhig & Besonnen', gender: 'Female' },
    { id: 'de-amala', neuralVoice: 'de-DE-AmalaNeural', elevenVoiceId: 'EXAVITQu4vr4xnSDxMaL', name: 'Amala', style: 'Sanft & Harmonisch', gender: 'Female' },
    { id: 'de-conrad', neuralVoice: 'de-DE-ConradNeural', elevenVoiceId: 'ErXwobaYiN019PkySvjV', name: 'Conrad', style: 'Warm & Geerdet', gender: 'Male' },
    { id: 'de-killian', neuralVoice: 'de-DE-KillianNeural', elevenVoiceId: 'onwK4e9ZLuTAKqWW03F9', name: 'Killian', style: 'Tief & Gelassen', gender: 'Male' },
    { id: 'de-louisa', neuralVoice: 'de-DE-LouisaNeural', elevenVoiceId: 'MF3mGyEYCl7XYWbV9V6O', name: 'Louisa', style: 'Freundlich & Positiv', gender: 'Female' },
    { id: 'de-bernd', neuralVoice: 'de-DE-ConradNeural', elevenVoiceId: 'AZnzlk1XvdvUeBnXmlld', name: 'Bernd', style: 'Klar & Motivierend', gender: 'Male' },
  ],
  it: [
    { id: 'it-elsa', neuralVoice: 'it-IT-ElsaNeural', elevenVoiceId: '21m00Tcm4TlvDq8ikWAM', name: 'Elsa', style: 'Calma e Riflessiva', gender: 'Female' },
    { id: 'it-isabella', neuralVoice: 'it-IT-IsabellaNeural', elevenVoiceId: 'EXAVITQu4vr4xnSDxMaL', name: 'Isabella', style: 'Dolce e Armoniosa', gender: 'Female' },
    { id: 'it-diego', neuralVoice: 'it-IT-DiegoNeural', elevenVoiceId: 'ErXwobaYiN019PkySvjV', name: 'Diego', style: 'Caldo e Rassicurante', gender: 'Male' },
    { id: 'it-giuseppe', neuralVoice: 'it-IT-GiuseppeNeural', elevenVoiceId: 'onwK4e9ZLuTAKqWW03F9', name: 'Giuseppe', style: 'Profondo e Posato', gender: 'Male' },
    { id: 'it-alessia', neuralVoice: 'it-IT-ElsaNeural', elevenVoiceId: 'MF3mGyEYCl7XYWbV9V6O', name: 'Alessia', style: 'Vivace e Solare', gender: 'Female' },
    { id: 'it-marco', neuralVoice: 'it-IT-DiegoNeural', elevenVoiceId: 'AZnzlk1XvdvUeBnXmlld', name: 'Marco', style: 'Chiaro ed Empatico', gender: 'Male' },
  ],
  pt: [
    { id: 'pt-francisca', neuralVoice: 'pt-BR-FranciscaNeural', elevenVoiceId: '21m00Tcm4TlvDq8ikWAM', name: 'Francisca', style: 'Serena e Acolhedora', gender: 'Female' },
    { id: 'pt-thalita', neuralVoice: 'pt-BR-ThalitaNeural', elevenVoiceId: 'EXAVITQu4vr4xnSDxMaL', name: 'Thalita', style: 'Suave e Tranquila', gender: 'Female' },
    { id: 'pt-antonio', neuralVoice: 'pt-BR-AntonioNeural', elevenVoiceId: 'ErXwobaYiN019PkySvjV', name: 'Antônio', style: 'Caloroso e Seguro', gender: 'Male' },
    { id: 'pt-fabio', neuralVoice: 'pt-BR-FabioNeural', elevenVoiceId: 'onwK4e9ZLuTAKqWW03F9', name: 'Fábio', style: 'Profundo e Focado', gender: 'Male' },
    { id: 'pt-yara', neuralVoice: 'pt-BR-FranciscaNeural', elevenVoiceId: 'MF3mGyEYCl7XYWbV9V6O', name: 'Yara', style: 'Alegre e Inspiradora', gender: 'Female' },
    { id: 'pt-lucas', neuralVoice: 'pt-BR-AntonioNeural', elevenVoiceId: 'AZnzlk1XvdvUeBnXmlld', name: 'Lucas', style: 'Claro e Positivo', gender: 'Male' },
  ],
  hi: [
    { id: 'hi-swara', neuralVoice: 'hi-IN-SwaraNeural', elevenVoiceId: '21m00Tcm4TlvDq8ikWAM', name: 'Swara (स्वर)', style: 'शांत एवं ध्यानमयी', gender: 'Female' },
    { id: 'hi-kavya', neuralVoice: 'hi-IN-SwaraNeural', elevenVoiceId: 'EXAVITQu4vr4xnSDxMaL', name: 'Kavya (काव्या)', style: 'कोमल एवं मधुर', gender: 'Female' },
    { id: 'hi-madhur', neuralVoice: 'hi-IN-MadhurNeural', elevenVoiceId: 'ErXwobaYiN019PkySvjV', name: 'Madhur (मधुर)', style: 'स्नेहपूर्ण एवं स्थिर', gender: 'Male' },
    { id: 'hi-aarav', neuralVoice: 'hi-IN-MadhurNeural', elevenVoiceId: 'onwK4e9ZLuTAKqWW03F9', name: 'Aarav (आरव)', style: 'गंभीर एवं शांत', gender: 'Male' },
    { id: 'hi-ananya', neuralVoice: 'hi-IN-SwaraNeural', elevenVoiceId: 'MF3mGyEYCl7XYWbV9V6O', name: 'Ananya (अनन्या)', style: 'उत्साही एवं प्रेरक', gender: 'Female' },
    { id: 'hi-rohan', neuralVoice: 'hi-IN-MadhurNeural', elevenVoiceId: 'AZnzlk1XvdvUeBnXmlld', name: 'Rohan (रोहन)', style: 'स्पष्ट एवं सहज', gender: 'Male' },
  ],
  ja: [
    { id: 'ja-nanami', neuralVoice: 'ja-JP-NanamiNeural', elevenVoiceId: '21m00Tcm4TlvDq8ikWAM', name: 'Nanami (七海)', style: '穏やかで安らぐ声', gender: 'Female' },
    { id: 'ja-aoi', neuralVoice: 'ja-JP-AoiNeural', elevenVoiceId: 'EXAVITQu4vr4xnSDxMaL', name: 'Aoi (葵)', style: '優しく透明感のある声', gender: 'Female' },
    { id: 'ja-keita', neuralVoice: 'ja-JP-KeitaNeural', elevenVoiceId: 'ErXwobaYiN019PkySvjV', name: 'Keita (圭太)', style: '温かく落ち着いた声', gender: 'Male' },
    { id: 'ja-naoki', neuralVoice: 'ja-JP-NaokiNeural', elevenVoiceId: 'onwK4e9ZLuTAKqWW03F9', name: 'Naoki (直樹)', style: '深く頼もしい声', gender: 'Male' },
    { id: 'ja-mayu', neuralVoice: 'ja-JP-MayuNeural', elevenVoiceId: 'MF3mGyEYCl7XYWbV9V6O', name: 'Mayu (繭)', style: '明るく爽やかな声', gender: 'Female' },
    { id: 'ja-daichi', neuralVoice: 'ja-JP-KeitaNeural', elevenVoiceId: 'AZnzlk1XvdvUeBnXmlld', name: 'Daichi (大地)', style: '澄んだ力強い声', gender: 'Male' },
  ],
  ko: [
    { id: 'ko-sunhi', neuralVoice: 'ko-KR-SunHiNeural', elevenVoiceId: '21m00Tcm4TlvDq8ikWAM', name: 'SunHi (선희)', style: '차분하고 따뜻한 목소리', gender: 'Female' },
    { id: 'ko-jimin', neuralVoice: 'ko-KR-JiMinNeural', elevenVoiceId: 'EXAVITQu4vr4xnSDxMaL', name: 'JiMin (지민)', style: '부드럽고 맑은 목소리', gender: 'Female' },
    { id: 'ko-injoon', neuralVoice: 'ko-KR-InJoonNeural', elevenVoiceId: 'ErXwobaYiN019PkySvjV', name: 'InJoon (인준)', style: '따스하고 안정된 목소리', gender: 'Male' },
    { id: 'ko-bongjin', neuralVoice: 'ko-KR-BongJinNeural', elevenVoiceId: 'onwK4e9ZLuTAKqWW03F9', name: 'BongJin (봉진)', style: '깊고 그윽한 목소리', gender: 'Male' },
    { id: 'ko-yujin', neuralVoice: 'ko-KR-SunHiNeural', elevenVoiceId: 'MF3mGyEYCl7XYWbV9V6O', name: 'YuJin (유진)', style: '밝고 활기찬 목소리', gender: 'Female' },
    { id: 'ko-minho', neuralVoice: 'ko-KR-InJoonNeural', elevenVoiceId: 'AZnzlk1XvdvUeBnXmlld', name: 'MinHo (민호)', style: '명료하고 자신감 있는 목소리', gender: 'Male' },
  ],
  zh: [
    { id: 'zh-xiaoxiao', neuralVoice: 'zh-CN-XiaoxiaoNeural', elevenVoiceId: '21m00Tcm4TlvDq8ikWAM', name: '晓晓 (Xiaoxiao)', style: '温和沉静 · 适合冥想', gender: 'Female' },
    { id: 'zh-xiaoyi', neuralVoice: 'zh-CN-XiaoyiNeural', elevenVoiceId: 'EXAVITQu4vr4xnSDxMaL', name: '晓伊 (Xiaoyi)', style: '柔和甜美 · 亲切舒缓', gender: 'Female' },
    { id: 'zh-yunxi', neuralVoice: 'zh-CN-YunxiNeural', elevenVoiceId: 'ErXwobaYiN019PkySvjV', name: '云希 (Yunxi)', style: '温润亲切 · 儒雅男声', gender: 'Male' },
    { id: 'zh-yunjian', neuralVoice: 'zh-CN-YunjianNeural', elevenVoiceId: 'onwK4e9ZLuTAKqWW03F9', name: '云健 (Yunjian)', style: '沉稳浑厚 · 坚定有力', gender: 'Male' },
    { id: 'zh-xiaochen', neuralVoice: 'zh-CN-XiaoxiaoNeural', elevenVoiceId: 'MF3mGyEYCl7XYWbV9V6O', name: '晓辰 (Xiaochen)', style: '开朗明澈 · 阳光朝气', gender: 'Female' },
    { id: 'zh-yunyang', neuralVoice: 'zh-CN-YunxiNeural', elevenVoiceId: 'AZnzlk1XvdvUeBnXmlld', name: '云扬 (Yunyang)', style: '清亮自然 · 娓娓道来', gender: 'Male' },
  ],
  ar: [
    { id: 'ar-zariyah', neuralVoice: 'ar-SA-ZariyahNeural', elevenVoiceId: '21m00Tcm4TlvDq8ikWAM', name: 'Zariyah (زارية)', style: 'هادئة وواعية', gender: 'Female' },
    { id: 'ar-fatima', neuralVoice: 'ar-SA-FatimaNeural', elevenVoiceId: 'EXAVITQu4vr4xnSDxMaL', name: 'Fatima (فاطمة)', style: 'ناعمة ورقيقة', gender: 'Female' },
    { id: 'ar-hamed', neuralVoice: 'ar-SA-HamedNeural', elevenVoiceId: 'ErXwobaYiN019PkySvjV', name: 'Hamed (حامد)', style: 'دافئ ومطمئن', gender: 'Male' },
    { id: 'ar-naayf', neuralVoice: 'ar-SA-NaayfNeural', elevenVoiceId: 'onwK4e9ZLuTAKqWW03F9', name: 'Naayf (نايف)', style: 'عميق ورصين', gender: 'Male' },
    { id: 'ar-amina', neuralVoice: 'ar-SA-ZariyahNeural', elevenVoiceId: 'MF3mGyEYCl7XYWbV9V6O', name: 'Amina (أمينة)', style: 'مشرقة وملهمة', gender: 'Female' },
    { id: 'ar-rashid', neuralVoice: 'ar-SA-HamedNeural', elevenVoiceId: 'AZnzlk1XvdvUeBnXmlld', name: 'Rashid (راشد)', style: 'واضح وقوي', gender: 'Male' },
  ],
  pl: [
    { id: 'pl-zofia', neuralVoice: 'pl-PL-ZofiaNeural', elevenVoiceId: '21m00Tcm4TlvDq8ikWAM', name: 'Zofia', style: 'Spokojna i Uważna', gender: 'Female' },
    { id: 'pl-agnieszka', neuralVoice: 'pl-PL-AgnieszkaNeural', elevenVoiceId: 'EXAVITQu4vr4xnSDxMaL', name: 'Agnieszka', style: 'Ciepła i Łagodna', gender: 'Female' },
    { id: 'pl-marek', neuralVoice: 'pl-PL-MarekNeural', elevenVoiceId: 'ErXwobaYiN019PkySvjV', name: 'Marek', style: 'Serdeczny i Zrównoważony', gender: 'Male' },
    { id: 'pl-jan', neuralVoice: 'pl-PL-MarekNeural', elevenVoiceId: 'onwK4e9ZLuTAKqWW03F9', name: 'Jan', style: 'Głęboki i Uspokajający', gender: 'Male' },
    { id: 'pl-ewa', neuralVoice: 'pl-PL-ZofiaNeural', elevenVoiceId: 'MF3mGyEYCl7XYWbV9V6O', name: 'Ewa', style: 'Radosna i Otwarta', gender: 'Female' },
    { id: 'pl-piotr', neuralVoice: 'pl-PL-MarekNeural', elevenVoiceId: 'AZnzlk1XvdvUeBnXmlld', name: 'Piotr', style: 'Wyrazisty i Pewny', gender: 'Male' },
  ],
};

// Default backwards compatibility
export const TTS_VOICES = LANGUAGE_VOICES.en;

// ─── Multilingual Localization Dictionary for Quests ───
const QUEST_LOCALIZATIONS = {
  'Joy Snapshot': {
    es: {
      title: 'Instantánea de Alegría',
      description: 'Escribe 5 cosas específicas que contribuyeron a tu felicidad hoy. ¡Sé detallado!',
      steps: [
        'Haz una pausa y respira profundamente',
        'Piensa en tu día hasta ahora',
        'Escribe 5 momentos felices específicos',
        'Para cada uno, anota por qué te hizo feliz',
      ],
    },
    fr: {
      title: 'Instantané de Joie',
      description: 'Note 5 choses précises qui ont contribué à ton bonheur aujourd’hui. Sois détaillé !',
      steps: [
        'Fais une pause et prends une profonde inspiration',
        'Pense à ta journée jusqu’à présent',
        'Écris 5 moments joyeux précis',
        'Pour chacun, note pourquoi il t’a rendu heureux',
      ],
    },
    de: {
      title: 'Freuden-Momentaufnahme',
      description: 'Schreibe 5 konkrete Dinge auf, die heute zu deinem Glück beigetragen haben. Sei detailliert!',
      steps: [
        'Halte inne und nimm einen tiefen Atemzug',
        'Denke an deinen bisherigen Tag',
        'Schreibe 5 konkrete glückliche Momente auf',
        'Notiere für jeden, warum er dich glücklich gemacht hat',
      ],
    },
    it: {
      title: 'Istantanea di Gioia',
      description: 'Scrivi 5 cose specifiche che hanno contribuito alla tua felicità oggi. Sii dettagliato!',
      steps: [
        'Fai una pausa e fai un respiro profondo',
        'Pensa alla tua giornata finora',
        'Scrivi 5 momenti felici specifici',
        'Per ognuno, annota perché ti ha reso felice',
      ],
    },
    pt: {
      title: 'Retrato da Alegria',
      description: 'Escreva 5 coisas específicas que contribuíram para a sua felicidade hoje. Seja detalhado!',
      steps: [
        'Faça uma pausa e respire fundo',
        'Pense no seu dia até agora',
        'Escreva 5 momentos felizes específicos',
        'Para cada um, anote por que isso lhe trouxe alegria',
      ],
    },
    hi: {
      title: 'आनंद की तस्वीर',
      description: 'आज आपकी खुशी में योगदान देने वाली 5 विशिष्ट बातें लिखें। विस्तार से बताएं!',
      steps: [
        'एक पल रुकें और गहरी सांस लें',
        'आज के दिन के बारे में सोचें',
        '5 विशिष्ट सुखद क्षण लिखें',
        'प्रत्येक के लिए लिखें कि उसने आपको खुश क्यों किया',
      ],
    },
    ja: {
      title: '喜びのスナップショット',
      description: '今日あなたの幸せにつながった5つの具体的なことを書き留めましょう。詳しく書いてみてください！',
      steps: [
        '立ち止まり、深呼吸をしましょう',
        '今日一日の出来事を振り返ってください',
        '嬉しかった瞬間を具体的に5つ書き出します',
        'それぞれについて、なぜ嬉しかったのか理由をメモしましょう',
      ],
    },
    ko: {
      title: '기쁨의 스냅샷',
      description: '오늘 당신을 행복하게 만든 구체적인 5가지를 적어보세요. 자세히 적을수록 좋습니다!',
      steps: [
        '잠시 멈추고 깊게 숨을 들이쉬세요',
        '오늘 하루를 차분히 돌아보세요',
        '행복했던 구체적인 순간 5가지를 적으세요',
        '각각의 순간이 왜 당신을 기쁘게 했는지 적어보세요',
      ],
    },
    zh: {
      title: '快乐快照',
      description: '写下今天让你感到幸福的5件具体事情。越详细越好！',
      steps: [
        '暂停片刻，做一次深呼吸',
        '回顾你今天经历的美好细节',
        '写下5个具体的快乐瞬间',
        '对每一个瞬间，写下它让你感到快乐的原因',
      ],
    },
    ar: {
      title: 'لقطة الفرح',
      description: 'اكتب 5 أشياء محددة ساهمت في سعادتك اليوم. كن مفصلاً وممتناً!',
      steps: [
        'توقف للحظة وخذ نفساً عميقاً هادئاً',
        'فكر في مجريات يومك حتى الآن',
        'اكتب 5 لحظات بهيجة ومحددة',
        'لكل لحظة، دون سبب شعورك بالسعادة',
      ],
    },
    pl: {
      title: 'Migawka Radości',
      description: 'Zapisz 5 konkretnych rzeczy, które przyczyniły się dziś do Twojego szczęścia. Bądź szczegółowy!',
      steps: [
        'Zatrzymaj się i weź głęboki oddech',
        'Pomyśl o swoim dzisiejszym dniu',
        'Zapisz 5 konkretnych szczęśliwych chwil',
        'Dla każdej z nich zanotuj, dlaczego sprawiła Ci radość',
      ],
    },
  },
};

const FRAMING = {
  en: { intro: 'Mindful Quest', steps: 'Mindful steps', step: 'Step' },
  es: { intro: 'Misión Consciente', steps: 'Pasos recomendados', step: 'Paso' },
  fr: { intro: 'Quête Attentive', steps: 'Étapes recommandées', step: 'Étape' },
  de: { intro: 'Achtsame Aufgabe', steps: 'Empfohlene Schritte', step: 'Schritt' },
  it: { intro: 'Missione Consapevole', steps: 'Passaggi consigliati', step: 'Passo' },
  pt: { intro: 'Missão Consciente', steps: 'Passos recomendados', step: 'Passo' },
  hi: { intro: 'माइंडफुल क्वेस्ट', steps: 'ध्यानपूर्वक करने योग्य कदम', step: 'चरण' },
  ja: { intro: 'マインドフル・クエスト', steps: '手順', step: 'ステップ' },
  ko: { intro: '마인드풀 퀘스트', steps: '수행 단계', step: '단계' },
  zh: { intro: '正念练习', steps: '练习步骤', step: '步骤' },
  ar: { intro: 'مهمة واعية', steps: 'خطوات التمرين', step: 'الخطوة' },
  pl: { intro: 'Uważna Misja', steps: 'Kroki ćwiczenia', step: 'Krok' },
};

// ─── In-memory audio cache ───
const audioCache = new Map();

// ─── Current playback state ───
let currentAudio = null;
let currentObjectUrl = null;

/**
 * Stop any active audio immediately.
 */
export function stopTTS() {
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch (e) {}
    currentAudio = null;
  }
  if (currentObjectUrl) {
    try {
      URL.revokeObjectURL(currentObjectUrl);
    } catch (e) {}
    currentObjectUrl = null;
  }
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }
}

/**
 * Check if audio is currently playing.
 */
export function isTTSPlaying() {
  return currentAudio && !currentAudio.paused && !currentAudio.ended;
}

/**
 * Speak the quest narration using real studio neural audio.
 * Calls /api/elevenlabs to stream MP3 audio.
 */
export async function speakText(text, options = {}) {
  const {
    voiceId,
    language = 'en',
    apiKey,
    onStart,
    onEnd,
    onError,
    onAudioEngine,
  } = options;

  stopTTS();

  if (!text || !text.trim()) {
    onError?.('No text provided for narration');
    return;
  }

  // Find voice definition from LANGUAGE_VOICES
  const langVoices = LANGUAGE_VOICES[language] || LANGUAGE_VOICES.en;
  const activeVoice =
    langVoices.find((v) => v.id === voiceId || v.neuralVoice === voiceId || v.elevenVoiceId === voiceId) ||
    langVoices[0];

  const cacheKey = `${language}:${activeVoice.id}:${text.slice(0, 180)}`;

  try {
    let audioBlob;
    let engineInfo = 'Studio Neural AI';

    if (audioCache.has(cacheKey)) {
      const cached = audioCache.get(cacheKey);
      audioBlob = cached.blob;
      engineInfo = cached.engine;
    } else {
      const response = await fetch('/api/elevenlabs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text.slice(0, 1500),
          voiceId: activeVoice.id,
          neuralVoice: activeVoice.neuralVoice,
          elevenVoiceId: activeVoice.elevenVoiceId,
          language,
          apiKey: apiKey || undefined,
          stability: 0.55,
          similarity_boost: 0.8,
        }),
      });

      if (!response.ok) {
        throw new Error(`Voice server responded with ${response.status}`);
      }

      const engineHeader = response.headers.get('X-Audio-Engine') || 'Studio Neural Audio';
      engineInfo = engineHeader;

      audioBlob = await response.blob();

      if (audioCache.size >= 25) {
        const firstKey = audioCache.keys().next().value;
        audioCache.delete(firstKey);
      }
      audioCache.set(cacheKey, { blob: audioBlob, engine: engineInfo });
    }

    onAudioEngine?.(engineInfo);

    const objectUrl = URL.createObjectURL(audioBlob);
    currentObjectUrl = objectUrl;

    const audio = new Audio(objectUrl);
    currentAudio = audio;

    audio.addEventListener('play', () => onStart?.());
    audio.addEventListener('ended', () => {
      stopTTS();
      onEnd?.();
    });
    audio.addEventListener('error', (e) => {
      stopTTS();
      onError?.('Playback error occurred');
    });

    await audio.play();
  } catch (err) {
    console.error('Audio playback failed:', err);
    onError?.(err.message || 'Audio generation failed');
  }
}

/**
 * Build a structured narration script from a quest object.
 * Uses localized copy if known, otherwise formats with localized framing.
 */
export function buildQuestNarration(quest, language = 'en') {
  if (!quest) return '';

  const frame = FRAMING[language] || FRAMING.en;
  const localizedQuest = QUEST_LOCALIZATIONS[quest.title]?.[language];

  const title = localizedQuest?.title || quest.title;
  const description = localizedQuest?.description || quest.description;
  const rawSteps = localizedQuest?.steps || quest.steps || [];

  const parts = [];

  if (title) {
    parts.push(`${title}.`);
  }
  if (description) {
    parts.push(`${description}`);
  }
  if (rawSteps.length > 0) {
    parts.push(`${frame.steps}:`);
    rawSteps.forEach((step, idx) => {
      parts.push(`${frame.step} ${idx + 1}: ${step}.`);
    });
  }

  return parts.join(' ');
}
