
# Resume Analysis App Backend

**base URL** : https://neobuild-be-assis.onrender.com/

**API 1** : https://neobuild-be-assis.onrender.com/api/auth/login

Please make a POST CALL to the above endpoint using the payload below:
    
    {
    "username": "naval.ravikant",
    "password": "05111974"
    }

This will give you the JWT Token in the Response

**API 2**: https://neobuild-be-assis.onrender.com/api/resume/enrich

Please make a POST call using the following Headers and Payload below:

**Headers:**

    Content-Type: application/json
    Authorization: Bearer <YOUR ACCESS TOKEN (The JWT TOKEN received)>
    
    
 **Body:**

    {
    "url": <YOUR PDF URL>
    }

eg-> "https://www.dhli.in/uploaded_files/resumes/resume_3404.pdf"

**API 3**: https://neobuild-be-assis.onrender.com/api/resume/search

Please make a POST call using the following Headers and Payload below:

**Headers:**

    Content-Type: application/json
    Authorization: Bearer <YOUR ACCESS TOKEN (The JWT TOKEN received)>
**Body:**

    {
    "name": <NAME OF APPLICANT>
    }

eg-> "PRABHAT"

THIS WILL PROVIDE THE INFO RELATED TO THE APPLICANT WITH THE SPECIFIC NAME 

**API 1: Authentication API**

**API 2: Resume data enrichment API**

**API 3: Resume search API**

