# Contracts API - CIEL Cybersecurity Blog

## Mock Data Overview
Les données simulées dans `/app/frontend/src/mock/data.js` comprennent :
- **Articles** : 3 articles avec contenu complet, métadonnées et statistiques
- **Commentaires** : Commentaires associés aux articles avec système de likes
- **Information CIEL** : Données sur la section et ses spécialisations

## API Endpoints à Implémenter

### 1. Articles API

#### GET /api/articles
- **Description** : Récupérer la liste des articles avec pagination et filtres
- **Query Parameters** :
  - `page` (int) : Numéro de page (défaut: 1)
  - `limit` (int) : Nombre d'articles par page (défaut: 10)
  - `category` (string) : Filtrer par catégorie
  - `search` (string) : Recherche dans titre/contenu
  - `sort` (string) : "recent", "popular", "comments"
- **Response** : 
```json
{
  "articles": [Article],
  "total": int,
  "page": int,
  "limit": int
}
```

#### GET /api/articles/{id}
- **Description** : Récupérer un article complet avec son contenu
- **Response** : Article object avec contenu markdown

#### POST /api/articles/{id}/like
- **Description** : Ajouter un like à un article
- **Response** : Nouveau nombre de likes

### 2. Comments API

#### GET /api/articles/{id}/comments
- **Description** : Récupérer les commentaires d'un article
- **Response** : Array de commentaires triés par date

#### POST /api/articles/{id}/comments
- **Description** : Ajouter un commentaire à un article
- **Body** :
```json
{
  "author": "string",
  "content": "string"
}
```
- **Response** : Commentaire créé avec ID et timestamp

#### POST /api/comments/{id}/like
- **Description** : Liker un commentaire
- **Response** : Nouveau nombre de likes

### 3. CIEL Info API

#### GET /api/ciel-info
- **Description** : Récupérer les informations sur la section CIEL
- **Response** : Objet avec spécialisations et statistiques

## Data Models MongoDB

### Article Model
```python
class Article(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    excerpt: str
    content: str  # Markdown content
    author: str
    published_at: datetime
    category: str
    tags: List[str]
    read_time: str
    likes: int = 0
    comment_count: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
```

### Comment Model
```python
class Comment(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    article_id: str
    author: str
    content: str
    likes: int = 0
    published_at: datetime = Field(default_factory=datetime.utcnow)
```

### CIEL Info Model
```python
class CielInfo(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    mission: str
    specializations: List[dict]
    stats: dict
```

## Frontend Integration Changes

### 1. Remove Mock Data
- Supprimer les imports de `mockArticles`, `mockComments`, `mockCielInfo`
- Remplacer par des appels API axios

### 2. State Management
- Ajouter loading states pour les appels API
- Gestion d'erreurs appropriée
- Cache local pour améliorer les performances

### 3. API Service
Créer `/app/frontend/src/services/api.js` :
```javascript
const API_BASE = process.env.REACT_APP_BACKEND_URL + '/api';

export const articlesAPI = {
  getAll: (params) => axios.get(`${API_BASE}/articles`, { params }),
  getById: (id) => axios.get(`${API_BASE}/articles/${id}`),
  like: (id) => axios.post(`${API_BASE}/articles/${id}/like`)
};

export const commentsAPI = {
  getByArticle: (articleId) => axios.get(`${API_BASE}/articles/${articleId}/comments`),
  create: (articleId, data) => axios.post(`${API_BASE}/articles/${articleId}/comments`, data),
  like: (id) => axios.post(`${API_BASE}/comments/${id}/like`)
};

export const cielAPI = {
  getInfo: () => axios.get(`${API_BASE}/ciel-info`)
};
```

## Backend Implementation Priority

1. **Setup Models** : Définir les modèles Pydantic et MongoDB
2. **Seed Database** : Populer avec les données mock existantes
3. **Articles CRUD** : Endpoints de base pour les articles
4. **Comments System** : Système de commentaires complet
5. **Search & Filters** : Recherche et filtrage avancé
6. **Like System** : Système de likes pour articles et commentaires

## Testing Strategy

### Backend Tests
- Tests unitaires pour chaque endpoint
- Test de validation des modèles Pydantic
- Tests d'intégration avec MongoDB

### Frontend Integration
- Test des appels API
- Gestion des états de loading/error
- Tests de rendu conditionnel

## Migration Notes

- Les données mock actuelles serviront de seed data pour la base
- L'interface utilisateur reste inchangée
- Ajouter des indicateurs de loading appropriés
- Gérer les cas d'erreur réseau gracieusement