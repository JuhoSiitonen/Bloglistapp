# Bloglistapp 

Repository for **Fullstackopen** Bloglistapp with an implemented simple deployment pipeline.

The deployment pipeline is done with Github actions and Render.com is used as the hosting service. The pipeline actions build, lint, test (also end to end with Cypress), deploy to Render, notify of success or failure in Discord, check app health and make a patch tag release for new pushes to main branch. 

[Bloglistapp](https://bloglistapp-cicd.onrender.com/)

The default username is "Testaaja" and password is "salasana". Further features may be added in the future. For now this app serves as an example of implementing a CICD pipeline. 