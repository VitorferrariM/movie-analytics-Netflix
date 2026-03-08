🎞️ Movie Analytics Project – BigQuery + Metabase
📌 Sobre o projeto

Este projeto foi desenvolvido como parte de um desafio da comunidade Dados por Todos, com o objetivo de praticar um fluxo completo de análise de dados utilizando ferramentas modernas de Data Analytics.
O projeto consiste em construir um pipeline simples de dados, desde o armazenamento inicial até a criação de dashboards analíticos.

Fluxo do projeto:

Storage → BigQuery → Metabase

O objetivo é transformar dados brutos sobre filmes e avaliações em métricas e visualizações que permitam entender padrões de popularidade, ratings e tendências ao longo do tempo.

🏗 Arquitetura do Projeto

Pipeline de dados utilizado:

Data Source (CSV)
↓
Google Cloud Storage
↓
BigQuery (Modelagem de dados)
↓
Metabase (Dashboard e visualização)

Ferramentas utilizadas:

Google Cloud Storage
Google BigQuery
Metabase
Docker
SQL
GitHub

⚙️ Infraestrutura

O Metabase foi executado localmente utilizando Docker para facilitar a criação do ambiente de visualização de dados.
Exemplo de execução do container:
docker run -d -p 3000:3000 --name metabase metabase/metabase

Após executar o container, o Metabase fica disponível em:

http://localhost:3000

📂 Estrutura do Projeto
movie-analytics-bigquery-metabase

data/
   movies.csv
   ratings.csv

sql/
   movie_kpis.sql
   rating_by_year.sql
   top_movies.sql

dashboard/
   metabase_dashboard.png

README.md
📊 Métricas Criadas

Durante o projeto foram criadas algumas métricas importantes para análise dos filmes:

Média de avaliação dos filmes
Quantidade de avaliações
Avaliações por ano de lançamento
Filmes mais bem avaliados
Essas métricas alimentam os dashboards no Metabase.

🧠 Exemplo de Query SQL

Exemplo de cálculo de média de avaliação por filme:

SELECT
    movieId,
    AVG(rating) AS avg_rating
FROM `dataset.ratings`
GROUP BY movieId

Exemplo de análise de avaliações por ano de lançamento:

SELECT
    year,
    COUNT(movieId) AS total_movies
FROM `dataset.movies`
GROUP BY year
ORDER BY year
📈 Dashboard

O dashboard foi criado no Metabase para visualizar as principais métricas do projeto.

Exemplos de visualizações:
Distribuição de ratings
Popularidade dos filmes
Filmes mais bem avaliados
Análise por ano de lançamento

📸 Dashboard:

(Adicionar imagem do dashboard aqui)

🚀 Objetivo do Projeto

O principal objetivo deste projeto foi praticar um fluxo completo de dados utilizando ferramentas utilizadas no mercado de dados, incluindo:

ingestão de dados
modelagem analítica
criação de métricas
visualização de dados
Esse tipo de projeto é muito comum em ambientes de Data Analytics e Business Intelligence.

Site https://astounding-crisp-c8b1a5.netlify.app/

👨‍💻 Autor
Projeto desenvolvido por Vitor Ferrari Mendes como parte dos estudos em:
<p align="center">
  <img src="Captura de tela 2026-03-08 180526.jpg" width="800">
</p>
<p align="center">
  <img src="Untitled-2025-10-15-0115.excalidraw.png" width="800">
</p>

<p align="center">
  <img src="" width="800">
</p>



