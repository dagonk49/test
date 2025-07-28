from motor.motor_asyncio import AsyncIOMotorClient
import os
from datetime import datetime

# Database connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Collections
articles_collection = db.articles
comments_collection = db.comments
ciel_info_collection = db.ciel_info
formations_collection = db.formations

async def seed_database():
    """Seed database with initial data"""
    
    # Check if data already exists
    existing_articles = await articles_collection.count_documents({})
    if existing_articles > 0:
        return  # Data already seeded
    
    # Seed Articles
    mock_articles = [
        {
            "id": "1",
            "title": "Les dernières menaces en cybersécurité 2025",
            "excerpt": "Découvrez les nouvelles vulnérabilités et techniques d'attaque que les cybercriminels utilisent cette année.",
            "content": """# Les dernières menaces en cybersécurité 2025

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

La clé reste la vigilance et l'adaptation constante de nos défenses.""",
            "author": "Dr. Marie Dubois",
            "published_at": datetime.fromisoformat("2025-01-15T10:00:00"),
            "category": "Menaces",
            "tags": ["Cybersécurité", "IA", "Ransomware", "IoT"],
            "read_time": "5 min",
            "likes": 24,
            "comment_count": 3,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "id": "2",
            "title": "Réseaux Zero Trust : L'avenir de la sécurité",
            "excerpt": "Comment l'architecture Zero Trust révolutionne la protection des infrastructures informatiques.",
            "content": """# Réseaux Zero Trust : L'avenir de la sécurité

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

Cette approche permet de réduire considérablement les risques de compromission.""",
            "author": "Thomas Martin",
            "published_at": datetime.fromisoformat("2025-01-12T14:30:00"),
            "category": "Architecture",
            "tags": ["Zero Trust", "Réseaux", "Architecture", "Sécurité"],
            "read_time": "7 min",
            "likes": 31,
            "comment_count": 2,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "id": "3",
            "title": "Cryptographie quantique : Préparer l'après RSA",
            "excerpt": "Les ordinateurs quantiques menacent nos systèmes de chiffrement actuels. Comment s'y préparer ?",
            "content": """# Cryptographie quantique : Préparer l'après RSA

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

Il est crucial de commencer la préparation dès maintenant pour éviter une obsolescence brutale de nos systèmes de sécurité.""",
            "author": "Prof. Antoine Leroy",
            "published_at": datetime.fromisoformat("2025-01-08T09:15:00"),
            "category": "Cryptographie",
            "tags": ["Quantique", "Cryptographie", "RSA", "Post-quantique"],
            "read_time": "8 min",
            "likes": 19,
            "comment_count": 1,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
    ]
    
    await articles_collection.insert_many(mock_articles)
    
    # Seed Comments
    mock_comments = [
        {
            "id": "1",
            "article_id": "1",
            "author": "Alex Cyber",
            "content": "Excellent article ! Les attaques par IA sont effectivement un défi majeur. Avez-vous des recommandations spécifiques pour les PME ?",
            "published_at": datetime.fromisoformat("2025-01-15T15:30:00"),
            "likes": 3
        },
        {
            "id": "2",
            "article_id": "1",
            "author": "Sandra Tech",
            "content": "Je confirme pour les attaques RaaS, nous en voyons de plus en plus dans notre SOC. La sensibilisation reste primordiale.",
            "published_at": datetime.fromisoformat("2025-01-15T16:45:00"),
            "likes": 5
        },
        {
            "id": "3",
            "article_id": "1",
            "author": "Mike Security",
            "content": "Très pertinent sur l'IoT industriel. Nous devons vraiment revoir nos approches de sécurisation des équipements connectés.",
            "published_at": datetime.fromisoformat("2025-01-16T08:20:00"),
            "likes": 2
        },
        {
            "id": "4",
            "article_id": "2",
            "author": "Lisa Network",
            "content": "Zero Trust est vraiment l'avenir ! Nous l'avons implémenté l'année dernière et les résultats sont impressionnants.",
            "published_at": datetime.fromisoformat("2025-01-12T20:15:00"),
            "likes": 8
        },
        {
            "id": "5",
            "article_id": "2",
            "author": "David Admin",
            "content": "Comment gérez-vous la complexité de mise en œuvre ? Nos équipes ont du mal avec la transition.",
            "published_at": datetime.fromisoformat("2025-01-13T10:30:00"),
            "likes": 4
        },
        {
            "id": "6",
            "article_id": "3",
            "author": "Quantum_Dev",
            "content": "Fascinant ! Quand pensez-vous que nous aurons des ordinateurs quantiques capables de casser RSA en production ?",
            "published_at": datetime.fromisoformat("2025-01-08T14:20:00"),
            "likes": 6
        }
    ]
    
    await comments_collection.insert_many(mock_comments)
    
    # Seed CIEL Info
    ciel_info = {
        "id": "1",
        "name": "CIEL - Cybersécurité, Informatique et Réseaux Électroniques",
        "description": "Section spécialisée dans la formation aux métiers de la cybersécurité, de l'informatique et des réseaux électroniques.",
        "mission": "Former les experts en cybersécurité de demain à travers des programmes pratiques et des projets concrets.",
        "specializations": [
            {
                "title": "Cybersécurité",
                "description": "Protection des systèmes d'information, analyse des menaces, audit de sécurité"
            },
            {
                "title": "Réseaux & Télécommunications",
                "description": "Architecture réseau, administration système, infrastructures télécoms"
            },
            {
                "title": "Développement Sécurisé",
                "description": "Programmation sécurisée, tests de pénétration, développement d'outils"
            },
            {
                "title": "Électronique Numérique",
                "description": "Systèmes embarqués, IoT sécurisé, analyse de firmware"
            }
        ],
        "stats": {
            "students": 450,
            "graduates": 1200,
            "certifications": 15,
            "partners": 85
        }
    }
    
    await ciel_info_collection.insert_one(ciel_info)
    
    # Seed Formations
    formations_data = [
        {
            "id": "1",
            "level": "BAC_PRO",
            "title": "BAC PRO CIEL - Cybersécurité, Informatique et réseaux, ELectronique",
            "duration": "3 ans",
            "description": "Formation professionnelle de niveau 4 qui prépare aux métiers techniques de la cybersécurité, de l'informatique et de l'électronique.",
            "objectives": [
                "Acquérir les bases techniques en informatique et électronique",
                "Comprendre les enjeux de la cybersécurité",
                "Maîtriser les réseaux informatiques",
                "Développer des compétences en maintenance et support"
            ],
            "skills": [
                "Installation et configuration de systèmes",
                "Maintenance des équipements informatiques",
                "Sécurisation des réseaux locaux",
                "Support technique utilisateur",
                "Diagnostic de pannes électroniques"
            ],
            "career_paths": [
                "Technicien informatique",
                "Technicien réseau",
                "Technicien support",
                "Technicien maintenance",
                "Assistant cybersécurité"
            ],
            "admission_requirements": [
                "Niveau 3ème ou équivalent",
                "Motivation pour l'informatique et l'électronique",
                "Capacité de raisonnement logique"
            ],
            "program_highlights": [
                "Ateliers pratiques en laboratoire",
                "Projets sur équipements professionnels",
                "Stages en entreprise",
                "Certification CompTIA IT Fundamentals"
            ]
        },
        {
            "id": "2",
            "level": "BTS",
            "title": "BTS CIEL - Cybersécurité, Informatique et réseaux, ELectronique",
            "duration": "2 ans",
            "description": "Formation supérieure de niveau 5 spécialisée dans les technologies numériques avec un focus cybersécurité.",
            "objectives": [
                "Maîtriser l'architecture des systèmes numériques",
                "Développer l'expertise en cybersécurité",
                "Gérer les infrastructures réseau complexes",
                "Concevoir des solutions sécurisées"
            ],
            "skills": [
                "Administration systèmes et réseaux avancée",
                "Analyse et prévention des cybermenaces",
                "Développement d'applications sécurisées",
                "Audit de sécurité informatique",
                "Gestion de projets IT"
            ],
            "career_paths": [
                "Administrateur systèmes et réseaux",
                "Analyste cybersécurité",
                "Intégrateur de solutions",
                "Consultant en sécurité informatique",
                "Chef de projet IT"
            ],
            "admission_requirements": [
                "BAC PRO CIEL ou équivalent",
                "BAC général ou technologique",
                "Dossier scolaire et motivation"
            ],
            "program_highlights": [
                "Laboratoire cybersécurité dédié",
                "Projets en partenariat avec l'industrie",
                "Certifications professionnelles (CISSP, CEH)",
                "Stage de 10 semaines en entreprise"
            ]
        },
        {
            "id": "3",
            "level": "MASTER",
            "title": "Master Cybersécurité et Réseaux",
            "duration": "2 ans",
            "description": "Formation de haut niveau (Bac+5) pour former les experts et managers de la cybersécurité.",
            "objectives": [
                "Maîtriser les technologies de pointe en cybersécurité",
                "Développer une vision stratégique de la sécurité",
                "Manager des équipes de sécurité informatique",
                "Conduire des projets de transformation numérique sécurisée"
            ],
            "skills": [
                "Architecture de sécurité d'entreprise",
                "Cryptographie avancée et post-quantique",
                "Intelligence artificielle appliquée à la sécurité",
                "Management des risques cyber",
                "Gouvernance et conformité (RGPD, ISO 27001)"
            ],
            "career_paths": [
                "Responsable sécurité des systèmes d'information (RSSI)",
                "Consultant senior en cybersécurité",
                "Architecte sécurité",
                "Chercheur en cybersécurité",
                "Directeur technique cybersécurité"
            ],
            "admission_requirements": [
                "BTS CIEL ou équivalent Bac+2",
                "Licence informatique/électronique",
                "Expérience professionnelle appréciée",
                "Dossier académique et entretien"
            ],
            "program_highlights": [
                "Partenariats avec les leaders de la cybersécurité",
                "Laboratoires de recherche en sécurité",
                "Projets industriels d'envergure",
                "Double diplôme possible avec universités partenaires",
                "Certifications expertes (CISSP, CISM, CISA)"
            ]
        }
    ]
    
    await formations_collection.insert_many(formations_data)