import { rest } from "msw";
import { 
  BASE_URL_LOGIN, 
  BASE_URL_HEADER_DETAIL, 
  BASE_URL_VERIFY_USER, 
  BASE_URL_CHANGE_PASSWORD, 
  BASE_URL_MENU,
} from 'constants/routingApi';

export const handlers = [
  rest.post(BASE_URL_LOGIN, (req, res, ctx) => {
    const { userId, password } = req.json();
    if (userId === 'test' && password === 'password') {
      return res(
        ctx.status(200),
        ctx.json({ token: 'mocked_token' })
      );
    } else {
      return res(
        ctx.status(401),
        ctx.json({ error: 'Invalid credentials' })
      );
    }

  }),
  rest.get(BASE_URL_HEADER_DETAIL, null),
  rest.post(BASE_URL_VERIFY_USER, (req, res, ctx) => {
    const { userId } = req.json();
    if (userId == 'test') {
      return res(
        ctx.status(200),
        ctx.json({
          responseMessage: "User credentials verified successfully",
          email: "sushil.kumxxxx@wipro.com",
          contactNumber: "XXXXXX5423"
        })
      );
    } else {
      return res(
        ctx.status(401),
        ctx.json({ error: 'USER_NOT_FOUND' })
      );
    }
  }),
  rest.post(BASE_URL_CHANGE_PASSWORD, (req, res, ctx) => {
    const { userId, oldPassword } = req.json();
    if (oldPassword == 'Dmatest@123' && ( newPassword == 'Dma@test1234' && confirmNewPassword == 'Dma@test1234')) {
      return res(
        ctx.status(200),
        ctx.json({
          responseMessage: "Your password has been changed successfully. You can now log in using your new password."
        
        })
      )
    }
    else{
      return res(
        ctx.status(401),
        ctx.json({
          error: "The old password you provided does not match our records. Please make sure you entered the correct old password and try again."
        })
      );
    }
  }),
  rest.get(BASE_URL_HEADER_DETAIL, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
        {
            responseMessage: "Header Retrieved Successfully.",
            data: {
                header: null,
                tickerMessage: "Ticker Message",
                notificationCount: 2,
                userType: "DLR",
                firstName: "Sushil",
                lastName: "Kumar",
                mobileNo: "2656765423",
                emailId: "sushil.kumar74@wipro.com",
                userId: "sushil",
                dealerId: "2c2262b0-b362-40cd-87d5-dcf468d62b55",
                dealerName: "G3 MOTORS LTD.",
                dealerLocation: null,
                dealerImage: null,
                parentGroupCode: null
            }
        }
      ),
      ctx.delay(100)
    )
  }),
  rest.get(BASE_URL_MENU, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
              {
                status: "OK",
                statusCode: 200,
                responseMessage: "User Menus Retrieved Successfully.",
                data: [
                    {
                        menuId: "FAV",
                        menuTitle: "Favourites",
                        parentMenuId: "Web",
                        menuIconUrl: "",
                        isFavourite: "1",
                        accessType: "R",
                        displayOrder: 0,
                        subMenu: [
                            {
                                menuId: "COMN-10.01",
                                menuTitle: "Customer Master",
                                parentMenuId: "FAV",
                                menuIconUrl: ""
                            }
                        ]
                    },
                ]
            }
      ),
      ctx.delay(100)
    )

  })
];
