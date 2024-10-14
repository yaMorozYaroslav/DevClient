'use client'
import {CheckOut} from '../../../comps/CheckOut/CheckOut.tsx'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)


export default function Payment(){
   const amount = 0.99	
   function convertToSubcurrency(amount, factor = 100){
		            return Math.round(amount * factor)}
		            
return (<><Elements stripe={stripePromise}
	              options={{
						  mode: 'payment',
						  total:{label:3},
						  amount: convertToSubcurrency(amount),
						  currency: 'usd'}}>
	       <CheckOut amount={amount}/>
	    </Elements></>
	        )}
