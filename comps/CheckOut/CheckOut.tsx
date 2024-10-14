'use client'

import React from 'react'
import * as S from './check-out.styled'
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js'

export const CheckOut = ({amount}: {amount: number}) => {
	const stripe = useStripe();
	const elements = useElements();
	
	const [errorMessage, setErrorMessage] = React.useState<string>();
	const [clientSecret, setClientSecret] = React.useState('')
	const [loading, setLoading] = React.useState(false)
	
	function convertToSubcurrency(amount, factor = 100){
		            return Math.round(amount * factor)}
	
	React.useEffect(()=>{
		fetch(`/api/create-payment-intent`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ amount: convertToSubcurrency(amount)})
			})
			.then((res) => res.json())
			.then((data) => setClientSecret(data.clientSecret))
		}, [amount]);
	const handleSubmit = async(event : React.FormEvent<HTMLFormElement>) => {
		                       event.preventDefault();
		                       setLoading(true)
    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }
     const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/payment-success?amount=${amount}`,
      },
    });
    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      setErrorMessage(error.message);
    } else {
      // The payment UI automatically closes with a success animation.
      // Your customer is redirected to your `return_url`.
    }

    setLoading(false);
  };
  if (!clientSecret || !stripe || !elements) {return <button>loading</button>}
		                       	
	return (<form onSubmit={handleSubmit}>

	         {clientSecret && <S.Container>
				                     <PaymentElement />
				              </S.Container>}
	         {errorMessage && <div>{errorMessage}</div>}
	         <button style={{marginTop: '120px'}}>
	           {!loading ? `Pay $${amount}` : "Processing..."}
	         </button>	
		    </form>)
	}
	
