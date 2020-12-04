# Pengjie-Zhou-Xiaowei-Dong-assignment3



#### Describe your data model and schema. How did Mongoose make this easy or hard to express?
We defined three properties in the URL schema: longUrl, shortUrl and date, they are all of 'String' type. The longUrl represents the original URL link, the shortUrl represents the shortened path ID, the date is the current local date when the shortUrl is generated.<br>
Mongoose makes it easy as it has validations and model methods thereby saves us to write our own instance methods. For example, we use findOne(), deleteOne() to valid the existence of shortUrls.

#### Have you worked with databases before? How was this different or similar? If you’ve not worked with databases before, describe your challenges and ease in representing this data.
I used MySQL before. The similarity with MySQL and MongoDB is that we have to generate schemas for user input in both databases. However, the ways of schema design in MySQL and MongoDB are different: We have to adapt objects in code in normalisation due to MySQL's rigid relational structure. In this assignment, MongoDB provides us a more flexible data model and stores data as JSON-like documents. 

#### Respond to some of the questions or considerations from the Error Handling and Complications section of the assignment.
1. *What if the same URL is submitted by multiple users?  Will you return a unique URL each time, or an already existing URL?*<br>
   Our application will generete a new unique URL to each input even if it already exists in our database.<br>
2. *What if a user requests a branded URL that already exists.  How will you handle this scenario on the UI?*<br>
   We have generated a error message "There exist a short url for your long url" so that the user will be notified for the duplication.<br>
3. *How will you structure your data in MongoDB?  Will branded and unbranded URLs be stored and/or represented differently?* <br>
   We store the branded and unbranded URLs seperately. We represent them in seperate pages and give users the option to select which type of shortURL they want to generate.<br>
4. *How will you handle the case if a user were to supply an invalid URL, or a string that isn’t a URL at all?*<br>
   We have generated a error message "Not a valid url" under the link paste bar so that the user will be notified for the error.<br>
5. *After a user deletes, what should you show on the UI?*<br>
   After a user clicks the 'delete' button in the 'Branded' page (we assume user cann't edit/delete unbranded url so didn't put the edit/delete function there), the   existed url will be removed from the UI, and the user will be redirected back to the Home page.<br>
6. *What if users try to edit a URL that doesn’t exist?*<br>
   Our current design will not handle the edit request for any nonexistent url, users submitting such requests will be redirected to the Home page.<br>

#### Given more time, what additional features, functionality or design changes would you make?
Our current design enables the users to edit/delete any existing shorten urls in the database. Given more time, we may implement functions to enable the user to manage only the urls they created. We are considering either of the two ways to realize this: 1. Create user login so that each user will have an account to manage the urls they created. 2. Use cookies to save all urls created by a user. <br>

#### What assumptions, if any, did you make on this assignment?
We assume that once the user choose the generate an unbranded shortUrl, it can neither be edit nor delete (as the specification indicates that "users should NOT be able to modify the unique path ID"), therefore there's no edit/delete function in the Unbranded page. By contrast, the user should be able to edit/delete the longUrl and customize the shortenUrl, we thereby realise the edit/delete function in the Branded page. To make user clear on the differences between the "Branded" and "Unbranded" tag, we have given additional instructions on the home page.

Pengjie 'Crisp' Zhou <br>
Xiaowei Dong

