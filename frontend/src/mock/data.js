// Mock data for CIEL Cybersecurity blog
export const mockArticles = [
  {
    id: 1,
    title: "Les dernières menaces en cybersécurité 2025",
    excerpt: "Découvrez les nouvelles vulnérabilités et techniques d'attaque que les cybercriminels utilisent cette année.",
    content: `
# Les dernières menaces en cybersécurité 2025

La cybersécurité évolue constamment, et 2025 apporte son lot de nouveaux défis. Les attaques par intelligence artificielle deviennent de plus en plus sophistiquées.

## Les principales menaces identifiées

### 1. Attaques par IA générative
Les cybercriminels utilisent maintenant l'IA pour créer des malwares adaptatifs qui échappent aux systèmes de détection traditionnels.

### 2. Ransomware-as-a-Service (RaaS)
La démocratisation des outils de ransomware permet à des acteurs moins expérimentés de lancer des attaques sophistiquées.

### 3. Attaques sur l'IoT industriel
L'augmentation des objets connectés dans l'industrie crée de nouvelles surfaces d'attaque.

## Comment se protéger ?

- Mise à jour régulière des systèmes
- Formation continue des équipes
- Audit de sécurité périodique
- Surveillance en temps réel

La clé reste la vigilance et l'adaptation constante de nos défenses.
    `,
    author: "Dr. Marie Dubois",
    publishedAt: "2025-01-15T10:00:00Z",
    readTime: "5 min",
    category: "Menaces",
    tags: ["Cybersécurité", "IA", "Ransomware", "IoT"],
    likes: 24,
    comments: 8
  },
  {
    id: 2,
    title: "Réseaux Zero Trust : L'avenir de la sécurité",
    excerpt: "Comment l'architecture Zero Trust révolutionne la protection des infrastructures informatiques.",
    content: `
# Réseaux Zero Trust : L'avenir de la sécurité

L'approche Zero Trust révolutionne la façon dont nous concevons la sécurité réseau. Fini le périmètre de confiance traditionnel !

## Qu'est-ce que le Zero Trust ?

Le principe est simple : "Ne jamais faire confiance, toujours vérifier". Chaque accès, même interne, doit être authentifié et autorisé.

### Les piliers du Zero Trust

1. **Identité vérifiée** : Chaque utilisateur et dispositif doit prouver son identité
2. **Accès minimal** : Principe du moindre privilège
3. **Surveillance continue** : Monitoring en temps réel des activités
4. **Chiffrement bout en bout** : Protection des données en transit et au repos

## Mise en œuvre pratique

La transition vers Zero Trust nécessite une approche méthodique :

- Audit complet de l'infrastructure existante
- Cartographie des flux de données
- Implémentation progressive par segments
- Formation des équipes IT

Cette approche permet de réduire considérablement les risques de compromission.
    `,
    author: "Thomas Martin",
    publishedAt: "2025-01-12T14:30:00Z",
    readTime: "7 min",
    category: "Architecture",
    tags: ["Zero Trust", "Réseaux", "Architecture", "Sécurité"],
    likes: 31,
    comments: 12
  },
  {
    id: 3,
    title: "Cryptographie quantique : Préparer l'après RSA",
    excerpt: "Les ordinateurs quantiques menacent nos systèmes de chiffrement actuels. Comment s'y préparer ?",
    content: `
# Cryptographie quantique : Préparer l'après RSA

L'avènement des ordinateurs quantiques représente une révolution technologique majeure, mais aussi une menace pour nos systèmes cryptographiques actuels.

## La menace quantique

Les algorithmes de Shor et Grover, exécutés sur des ordinateurs quantiques suffisamment puissants, peuvent casser :

- RSA
- Elliptic Curve Cryptography (ECC)  
- Diffie-Hellman

## Solutions post-quantiques

### Nouveaux algorithmes résistants

1. **Cryptographie basée sur les réseaux** (lattice-based)
2. **Cryptographie basée sur les codes** (code-based)
3. **Cryptographie basée sur les équations multivariées**
4. **Cryptographie basée sur les isogénies**

### Transition pratique

- Hybridation temporaire (classique + post-quantique)
- Migration progressive des systèmes critiques
- Agilité cryptographique

## Calendrier de transition

- **2025-2027** : Standardisation finale des algorithmes
- **2028-2030** : Déploiement massif
- **2030+** : Remplacement complet

Il est crucial de commencer la préparation dès maintenant pour éviter une obsolescence brutale de nos systèmes de sécurité.
    `,
    author: "Prof. Antoine Leroy",
    publishedAt: "2025-01-08T09:15:00Z",
    readTime: "8 min",
    category: "Cryptographie",
    tags: ["Quantique", "Cryptographie", "RSA", "Post-quantique"],
    likes: 19,
    comments: 5
  }
];

export const mockComments = {
  1: [
    {
      id: 1,
      articleId: 1,
      author: "Alex Cyber",
      content: "Excellent article ! Les attaques par IA sont effectivement un défi majeur. Avez-vous des recommandations spécifiques pour les PME ?",
      publishedAt: "2025-01-15T15:30:00Z",
      likes: 3
    },
    {
      id: 2,
      articleId: 1,
      author: "Sandra Tech",
      content: "Je confirme pour les attaques RaaS, nous en voyons de plus en plus dans notre SOC. La sensibilisation reste primordiale.",
      publishedAt: "2025-01-15T16:45:00Z",
      likes: 5
    },
    {
      id: 3,
      articleId: 1,
      author: "Mike Security",
      content: "Très pertinent sur l'IoT industriel. Nous devons vraiment revoir nos approches de sécurisation des équipements connectés.",
      publishedAt: "2025-01-16T08:20:00Z",
      likes: 2
    }
  ],
  2: [
    {
      id: 4,
      articleId: 2,
      author: "Lisa Network",
      content: "Zero Trust est vraiment l'avenir ! Nous l'avons implémenté l'année dernière et les résultats sont impressionnants.",
      publishedAt: "2025-01-12T20:15:00Z",
      likes: 8
    },
    {
      id: 5,
      articleId: 2,
      author: "David Admin",
      content: "Comment gérez-vous la complexité de mise en œuvre ? Nos équipes ont du mal avec la transition.",
      publishedAt: "2025-01-13T10:30:00Z",
      likes: 4
    }
  ],
  3: [
    {
      id: 6,
      articleId: 3,
      author: "Quantum_Dev",
      content: "Fascinant ! Quand pensez-vous que nous aurons des ordinateurs quantiques capables de casser RSA en production ?",
      publishedAt: "2025-01-08T14:20:00Z",
      likes: 6
    }
  ]
};

export const mockCielInfo = {
  name: "CIEL - Cybersécurité, Informatique et Réseaux Électroniques",
  description: "Section spécialisée dans la formation aux métiers de la cybersécurité, de l'informatique et des réseaux électroniques.",
  mission: "Former les experts en cybersécurité de demain à travers des programmes pratiques et des projets concrets.",
  specializations: [
    {
      title: "Cybersécurité",
      description: "Protection des systèmes d'information, analyse des menaces, audit de sécurité",
      icon: "🔐"
    },
    {
      title: "Réseaux & Télécommunications", 
      description: "Architecture réseau, administration système, infrastructures télécoms",
      icon: "🌐"
    },
    {
      title: "Développement Sécurisé",
      description: "Programmation sécurisée, tests de pénétration, développement d'outils",
      icon: "💻"
    },
    {
      title: "Électronique Numérique",
      description: "Systèmes embarqués, IoT sécurisé, analyse de firmware",
      icon: "⚡"
    }
  ],
  stats: {
    students: 450,
    graduates: 1200,
    certifications: 15,
    partners: 85
  }
};