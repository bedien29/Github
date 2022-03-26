using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BanPhao : MonoBehaviour
{
    GameObject Mario;
    ParticleSystem ps;
    private void Awake()
    {
        Mario = GameObject.FindGameObjectWithTag("Player");
        
        
    }
    // Start is called before the first frame update
    void Start()
    {
        //ps.Simulate(1);
        //ps.Play(true);
    }

    // Update is called once per frame
    void Update()
    {
        if(Mario.transform.position.x >= 175f)
        {
            ps = GameObject.FindGameObjectWithTag("phao").GetComponent<ParticleSystem>();
            //ps.Simulate(1);
            ps.Play(true);
        }
    }

    
}
